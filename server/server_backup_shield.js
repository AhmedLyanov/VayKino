const https = require('https');
const fs = require('fs');
const express = require("express");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

const port = 3000;
const app = express();

// SSL сертификаты
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/dreamfood.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/dreamfood.space/fullchain.pem')
};

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Лимитеры
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(
  "mongodb://Ahmed:AhmedLyanov@91.197.96.204:27017/vaykino?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Ошибка подключения:"));
db.once("open", () => {
  console.log("Подключение к MongoDB успешно установлено");
});

// Секретные ключи
const SECRET_KEY = "vYk1n0!Pr0d@2024$kIn0R00m*JwT";
const REFRESH_SECRET_KEY = "r3Fr3$h!K1n0V4y@2024$3cR3t";

// Схемы Mongoose
const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  iconUrl: { type: String, required: true },
  criteria: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  avatarUrl: String,
  currentRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  gender: String,
  country: String,
  city: String,
  birthdate: String,
  genre: String,
  description: String,
  balance: { type: Number, default: 5000 },
  premium: { type: Boolean, default: false },
  premiumExpiresAt: Date,
  lastSeen: { type: Date, default: Date.now },
  role: { type: String, default: 'user' },
  achievements: [{
    achievementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' },
    unlockedAt: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model("User", userSchema);

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String },
  audioUrl: { type: String },
  avatarUrl: { type: String },
  timestamp: { type: Date, default: Date.now },
  roomId: { type: String },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    login: String,
    avatarUrl: String,
    joinedAt: { type: Date, default: Date.now }
  }],
  maxUsers: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  password: { type: String },
  lastActivity: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);

const revokedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Создаем папку uploads если ее нет
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Middleware аутентификации
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }
  try {
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Аккаунт не существует" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Неверный или истекший токен" });
  }
};

// Функция проверки и выдачи ачивок
async function checkAchievements(user) {
  try {
    // Проверка на премиум
    if (user.premium) {
      const premAchieve = await Achievement.findOne({ name: "Премиум-статус" });
      if (premAchieve && !user.achievements.some(a => a.achievementId && a.achievementId.equals(premAchieve._id))) {
        user.achievements.push({
          achievementId: premAchieve._id,
          unlockedAt: new Date()
        });
        io.to(`user_${user._id}`).emit('achievementUnlocked', {
          name: premAchieve.name,
          description: premAchieve.description,
          iconUrl: premAchieve.iconUrl
        });
      }
    }

    // Проверка на миллионера
    if (user.balance >= 1000000) {
      const millionAchieve = await Achievement.findOne({ name: "Миллионер" });
      if (millionAchieve && !user.achievements.some(a => a.achievementId && a.achievementId.equals(millionAchieve._id))) {
        user.achievements.push({
          achievementId: millionAchieve._id,
          unlockedAt: new Date()
        });
        io.to(`user_${user._id}`).emit('achievementUnlocked', {
          name: millionAchieve.name,
          description: millionAchieve.description,
          iconUrl: millionAchieve.iconUrl
        });
      }
    }

    await user.save();
  } catch (e) {
    console.log('Ошибка проверки ачивок:', e);
  }
}

// Создание начальных ачивок при запуске
async function initAchievements() {
  try {
    const count = await Achievement.countDocuments();
    if (count === 0) {
      await Achievement.create([
        {
          name: "Премиум-статус",
          description: "Активирована премиум-подписка",
          iconUrl: "/achievements/premium.png",
          criteria: { premium: true }
        },
        {
          name: "Миллионер",
          description: "ВайКино? нет, ВайБорз!",
          iconUrl: "/achievements/idiot.jpg",
          criteria: { balance: 1000000 }
        },
     

	
      ]);
      console.log("Созданы начальные ачивки");
    }
  } catch (e) {
    console.log("Ошибка создания ачивок:", e);
  }
}

// Маршруты API
app.post("/register", async (req, res) => {
  const { name, surname, login, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ login }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Пользователь с таким логином или email уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      surname,
      login,
      password: hashedPassword,
      email,
      avatarUrl: "",
      balance: 5000,
      premium: false,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    res.status(201).json({
      token,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        login: user.login,
        email: user.email,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка регистрации пользователя", details: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: "Логин и пароль обязательны" });
  }

  try {
    const user = await User.findOne({ login });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    user.lastSeen = Date.now();
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    res.json({ 
      token, 
      refreshToken, 
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        login: user.login,
        email: user.email,
        avatarUrl: user.avatarUrl,
        balance: user.balance,
        premium: user.premium
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка входа" });
  }
});

app.get("/user/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('achievements.achievementId');
    
    await checkAchievements(user);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения данных пользователя" });
  }
});

app.get("/user/achievements", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('achievements.achievementId');
    
    const achievements = user.achievements
      .filter(a => a.achievementId)
      .map(a => ({
        id: a.achievementId._id,
        name: a.achievementId.name,
        description: a.achievementId.description,
        iconUrl: a.achievementId.iconUrl,
        unlockedAt: a.unlockedAt
      }));
    
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения достижений" });
  }
});

app.post("/buy-premium", authMiddleware, async (req, res) => {
  const premiumPrice = 8000;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    if (user.premium) {
      return res.status(400).json({ error: "Премиум-подписка уже активирована" });
    }

    if (user.balance < premiumPrice) {
      return res.status(400).json({ error: "Недостаточно средств" });
    }
    
    user.balance -= premiumPrice;
    user.premium = true;
    user.premiumExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    await checkAchievements(user);
    await user.save();
    
    res.json({ 
      success: true,
      newBalance: user.balance,
      premium: user.premium,
      premiumExpiresAt: user.premiumExpiresAt
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка покупки премиума", details: error.message });
  }
});

app.post("/add-balance", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Неверная сумма пополнения" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    user.balance += amount;
    
    await checkAchievements(user);
    await user.save();
    
    res.json({ 
      success: true,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка пополнения баланса", details: error.message });
  }
});

app.put("/user/me", authMiddleware, async (req, res) => {
  try {
    const { name, surname, gender, country, city, birthdate, genre, description, avatarUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        name, 
        surname, 
        gender, 
        country, 
        city, 
        birthdate, 
        genre, 
        description, 
        avatarUrl 
      },
      { new: true }
    ).populate('achievements.achievementId');

    if (user) {
      io.to(`user_${user._id}`).emit('userUpdated', user);
      res.json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления данных пользователя", details: error.message });
  }
});

app.get("/user/:login", authMiddleware, async (req, res) => {
  const { login } = req.params;
  try {
    const user = await User.findOne({ login })
      .populate('achievements.achievementId');
      
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения данных пользователя", details: error.message });
  }
});

app.post("/upload-avatar", authMiddleware, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Файл не загружен" });
  }
  
  // Создаем полный URL
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
  res.json({ url: fileUrl });
});

app.post("/upload-image-message", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { sender, avatarUrl } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен" });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const newPath = path.join("uploads", fileName);
    fs.renameSync(req.file.path, newPath);

    const imageUrl = `/uploads/${fileName}`;
    const newMessage = new ChatMessage({
      sender,
      imageUrl,
      avatarUrl,
      roomId: "global", // Добавляем это
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();
    io.to("global").emit("newMessage", savedMessage); // Отправляем в глобальную комнату
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при загрузке изображения", details: error.message });
  }
});

app.post("/upload-voice-message", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { sender, avatarUrl, roomId } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен" });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const newPath = path.join("uploads", fileName);
    fs.renameSync(req.file.path, newPath);

    const audioUrl = `/uploads/${fileName}`;
    const newMessage = new ChatMessage({
      sender,
      audioUrl,
      avatarUrl,
      roomId,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();
    io.to(roomId).emit("newMessage", savedMessage);
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при загрузке голосового сообщения", details: error.message });
  }
});

app.get("/chat-messages", authMiddleware, async (req, res) => {
  try {
    // Получаем только сообщения для глобального чата (roomId: "global")
    const messages = await ChatMessage.find({ roomId: "global" }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении сообщений", details: error.message });
  }
});

app.post("/chat-messages", authMiddleware, async (req, res) => {
  const { sender, text, avatarUrl, role } = req.body;
  if (!sender || !text) {
    return res.status(400).json({ error: "Отправитель и текст сообщения обязательны" });
  }
  
  try {
    const newMessage = new ChatMessage({
      sender,
      text,
      avatarUrl,
      role,
      roomId: "global" // Явно указываем, что это сообщение для глобального чата
    });

    await newMessage.save();
    io.to("global").emit("newMessage", newMessage); // Отправляем в глобальную комнату
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при отправке сообщения", details: error.message });
  }
});

app.post("/rooms", authMiddleware, async (req, res) => {
  try {
    const { name, movie, maxUsers, isPrivate, password, videoUrl } = req.body;
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    if (user.currentRoom) {
      return res.status(400).json({
        error: 'Вы уже находитесь в другой комнате. Пожалуйста, покиньте её перед созданием новой.'
      });
    }

    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ error: 'Комната с таким именем уже существует' });
    }

    const newRoom = new Room({
      name,
      leader: userId,
      movie,
      maxUsers: maxUsers || 10,
      isPrivate: isPrivate || false,
      password: isPrivate ? await bcrypt.hash(password, 10) : undefined,
      videoUrl,
      users: [{
        userId: userId,
        login: user.login,
        avatarUrl: user.avatarUrl
      }],
      lastActivity: new Date()
    });

    await newRoom.save();
    user.currentRoom = newRoom._id;
    await user.save();

    const populatedRoom = await Room.findById(newRoom._id)
      .populate('leader', 'login avatarUrl')
      .populate('users.userId', 'login avatarUrl');

    res.status(201).json({
      ...populatedRoom.toObject(),
      success: true,
      message: 'Комната успешно создана'
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании комнаты', details: error.message });
  }
});

app.get("/rooms", async (req, res) => {
  try {
    // Удаляем неактивные комнаты (старше 24 часов)
    await Room.deleteMany({
      lastActivity: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    const rooms = await Room.find()
      .populate('leader', 'login avatarUrl')
      .populate('users.userId', 'login avatarUrl');

    res.json(rooms.map(room => ({
      _id: room._id,
      name: room.name,
      movie: room.movie,
      isPrivate: room.isPrivate,
      currentVideoTime: room.currentVideoTime,
      isPlaying: room.isPlaying,
      leader: {
        _id: room.leader._id,
        login: room.leader.login,
        avatarUrl: room.leader.avatarUrl
      },
      users: room.users.map(u => ({
        _id: u.userId._id,
        login: u.userId.login,
        avatarUrl: u.userId.avatarUrl
      })),
      usersCount: room.users.length,
      maxUsers: room.maxUsers,
      createdAt: room.createdAt
    })));
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении списка комнат', details: error.message });
  }
});

app.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('leader', 'login avatarUrl')
      .populate('users.userId', 'login avatarUrl');

    if (!room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    res.json({
      ...room.toObject(),
      leader: {
        _id: room.leader._id,
        login: room.leader.login,
        avatarUrl: room.leader.avatarUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении информации о комнате', details: error.message });
  }
});

app.post("/rooms/:id/join", authMiddleware, async (req, res) => {
  try {
    const roomId = req.params.id;
    const { password } = req.body;
    const userId = req.user._id;

    // Выходим из всех других комнат
    await Room.updateMany(
      { "users.userId": userId, _id: { $ne: roomId } },
      { $pull: { users: { userId: userId } } }
    );

    const room = await Room.findById(roomId)
      .populate('leader', 'login avatarUrl')
      .populate('users.userId', 'login avatarUrl');

    if (!room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    const isLeader = room.leader._id.equals(userId);
    
    // Проверка пароля для приватных комнат
    if (room.isPrivate && !isLeader) {
      if (!password) {
        return res.status(400).json({ error: 'Для приватной комнаты требуется пароль' });
      }
      if (!(await bcrypt.compare(password, room.password))) {
        return res.status(401).json({ error: 'Неверный пароль комнаты' });
      }
    }

    // Проверка на заполненность комнаты
    if (room.users.length >= room.maxUsers) {
      return res.status(400).json({ error: 'Комната заполнена' });
    }

    // Добавляем пользователя в комнату если его там нет
    const userInRoom = room.users.some(u => u.userId._id.equals(userId));
    if (!userInRoom) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      room.users.push({
        userId: user._id,
        login: user.login,
        avatarUrl: user.avatarUrl
      });
      room.lastActivity = new Date();
      await room.save();
    }

    // Обновляем текущую комнату пользователя
    await User.findByIdAndUpdate(userId, { currentRoom: roomId });

    res.json({
      ...room.toObject(),
      success: true,
      message: 'Вы успешно вошли в комнату',
      isLeader
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при входе в комнату', details: error.message });
  }
});

app.post("/rooms/:id/leave", authMiddleware, async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    // Удаляем пользователя из комнаты
    room.users = room.users.filter(u => !u.userId.equals(userId));
    room.lastActivity = new Date();
    await room.save();

    // Обновляем текущую комнату пользователя
    await User.findByIdAndUpdate(userId, { currentRoom: null });

    // Если комната пуста или пользователь был создателем - удаляем комнату
    if (room.users.length === 0 || room.leader.equals(userId)) {
      await Promise.all([
        Room.findByIdAndDelete(roomId),
        ChatMessage.deleteMany({ roomId: roomId }),
        User.updateMany(
          { currentRoom: roomId },
          { $set: { currentRoom: null } }
        )
      ]);

      return res.json({
        success: true,
        message: room.leader.equals(userId)
          ? 'Комната успешно удалена'
          : 'Вы успешно вышли из комнаты (комната удалена, так как она пуста)'
      });
    }

    res.json({
      success: true,
      message: 'Вы успешно вышли из комнаты'
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при выходе из комнаты', details: error.message });
  }
});

app.delete("/rooms/:id", authMiddleware, async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    if (!room.leader.equals(userId)) {
      return res.status(403).json({ error: 'Только создатель может удалить комнату' });
    }

    await Promise.all([
      Room.findByIdAndDelete(roomId),
      ChatMessage.deleteMany({ roomId }),
      User.updateMany(
        { currentRoom: roomId },
        { $set: { currentRoom: null } }
      )
    ]);

    res.json({
      success: true,
      message: 'Комната успешно удалена'
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении комнаты', details: error.message });
  }
});

app.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении транзакций", details: error.message });
  }
});

app.post("/logout", authMiddleware, async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(400).json({ error: "Неверный токен" });
    }

    // Выходим из всех комнат
    await Room.updateMany(
      { "users.userId": req.user._id },
      { $pull: { users: { userId: req.user._id } } }
    );

    // Обновляем текущую комнату пользователя
    await User.findByIdAndUpdate(req.user._id, { currentRoom: null });

    // Добавляем токен в список отозванных
    const revokedToken = new RevokedToken({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });
    await revokedToken.save();

    // Обновляем время последнего посещения
    req.user.lastSeen = Date.now();
    await req.user.save();

    res.json({ message: "Успешный выход из системы" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при выходе из системы", details: error.message });
  }
});

app.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh Token обязателен" });
  }

  try {
    // Проверяем, не отозван ли токен
    const isRevoked = await RevokedToken.findOne({ token: refreshToken });
    if (isRevoked) {
      return res.status(401).json({ error: "Token revoked" });
    }

    // Верифицируем токен
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Генерируем новый токен
    const newToken = jwt.sign(
      { userId: user._id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token", details: error.message });
  }
});

// Статические файлы
app.use("/uploads", express.static("uploads"));
app.use("/achievements", express.static(path.join(__dirname, "achievements")));

// WebSocket логика
io.on('connection', (socket) => {
  console.log('Новое подключение:', socket.id);
  socket.join("global");
  let currentRoomId = null;
  let currentUserId = null;

  // Подписка на обновления пользователя
  socket.on('subscribeToUserUpdates', async (userId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return socket.emit('error', { message: 'Неверный ID пользователя' });
      }

      const user = await User.findById(userId);
      if (user) {
        socket.join(`user_${userId}`);
        currentUserId = userId;
        socket.emit('subscribed', { success: true, userId });
      } else {
        socket.emit('error', { message: 'Пользователь не найден' });
      }
    } catch (error) {
      console.error('Ошибка подписки на обновления пользователя:', error);
      socket.emit('error', { message: 'Ошибка сервера' });
    }
  });

  // Вход в комнату
  socket.on('joinRoom', async ({ roomId, userId, password }) => {
    try {
      // Валидация ID
      if (!mongoose.Types.ObjectId.isValid(roomId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return socket.emit('roomError', { message: 'Неверный ID комнаты или пользователя' });
      }

      // Выход из предыдущих комнат
      await Room.updateMany(
        { "users.userId": userId, _id: { $ne: roomId } },
        { $pull: { users: { userId: userId } } }
      );

      // Получаем комнату и пользователя
      const [room, user] = await Promise.all([
        Room.findById(roomId)
          .populate('leader', 'login avatarUrl')
          .populate('users.userId', 'login avatarUrl'),
        User.findById(userId)
      ]);

      if (!room || !user) {
        return socket.emit('roomError', {
          message: room ? 'Пользователь не найден' : 'Комната не найдена'
        });
      }

      // Проверка пароля для приватных комнат
      const isLeader = room.leader._id.equals(userId);
      if (room.isPrivate && !isLeader) {
        if (!password) {
          return socket.emit('passwordRequired', { roomId });
        }
        if (!(await bcrypt.compare(password, room.password))) {
          return socket.emit('roomError', { message: 'Неверный пароль комнаты' });
        }
      }

      // Проверка на заполненность комнаты
      if (room.users.length >= room.maxUsers) {
        return socket.emit('roomError', { message: 'Комната заполнена' });
      }

      // Выход из текущей комнаты если есть
      if (currentRoomId) {
        socket.leave(currentRoomId);
        io.to(currentRoomId).emit('userLeft', {
          userId,
          login: user.login
        });
      }

      // Обновляем текущие данные
      currentRoomId = roomId;
      currentUserId = userId;
      socket.join(roomId);

      // Добавляем пользователя в комнату если его там нет
      const userInRoom = room.users.some(u => u.userId._id.equals(userId));
      if (!userInRoom) {
        room.users.push({
          userId: user._id,
          login: user.login,
          avatarUrl: user.avatarUrl
        });
        room.lastActivity = new Date();
        await room.save();
      }

      // Обновляем текущую комнату пользователя
      if (!user.currentRoom || !user.currentRoom.equals(roomId)) {
        user.currentRoom = roomId;
        await user.save();
      }

      // Формируем данные комнаты для ответа
      const roomData = {
        _id: room._id,
        name: room.name,
        leader: {
          _id: room.leader._id,
          login: room.leader.login,
          avatarUrl: room.leader.avatarUrl
        },
        isPrivate: room.isPrivate,
        currentVideoTime: room.currentVideoTime,
        isPlaying: room.isPlaying,
        users: room.users.map(u => ({
          _id: u.userId._id,
          login: u.userId.login,
          avatarUrl: u.userId.avatarUrl,
          isLeader: room.leader._id.equals(u.userId._id)
        })),
        maxUsers: room.maxUsers,
        createdAt: room.createdAt
      };

      // Отправляем ответы
      socket.emit('roomJoined', {
        success: true,
        room: roomData,
        isLeader
      });

      socket.to(roomId).emit('userJoined', {
        _id: user._id,
        login: user.login,
        avatarUrl: user.avatarUrl,
        isLeader
      });

      io.to(roomId).emit('usersUpdated', roomData.users);
    } catch (error) {
      console.error('Ошибка входа в комнату:', error);
      socket.emit('roomError', {
        message: 'Внутренняя ошибка сервера при входе в комнату'
      });
    }
  });

  // Обработка пароля комнаты
  socket.on('submitRoomPassword', async ({ roomId, password }) => {
    if (!currentUserId) {
      return socket.emit('error', { message: 'Пользователь не идентифицирован' });
    }
    socket.emit('joinRoom', { roomId, userId: currentUserId, password });
  });

  // Выход из комнаты
  socket.on('leaveRoom', async () => {
    if (!currentRoomId || !currentUserId) return;
    
    try {
      const [room, user] = await Promise.all([
        Room.findById(currentRoomId),
        User.findById(currentUserId)
      ]);

      if (room && user) {
        // Удаляем пользователя из комнаты
        room.users = room.users.filter(u => !u.userId.equals(currentUserId));
        room.lastActivity = new Date();
        await room.save();

        // Обновляем текущую комнату пользователя
        user.currentRoom = null;
        await user.save();

        // Уведомляем других участников
        socket.to(currentRoomId).emit('userLeft', {
          _id: currentUserId,
          login: user.login
        });

        // Обновляем список пользователей
        const usersList = room.users.map(u => ({
          _id: u.userId._id,
          login: u.userId.login,
          avatarUrl: u.userId.avatarUrl,
          isLeader: room.leader._id.equals(u.userId._id)
        }));

        io.to(currentRoomId).emit('usersUpdated', usersList);

        // Удаляем комнату если она пуста или пользователь был создателем
        if (room.users.length === 0 || room.leader.equals(currentUserId)) {
          await Promise.all([
            Room.findByIdAndDelete(currentRoomId),
            ChatMessage.deleteMany({ roomId: currentRoomId })
          ]);
        }
      }

      // Выходим из комнаты
      socket.leave(currentRoomId);
      currentRoomId = null;
      currentUserId = null;
      socket.emit('roomLeft', { success: true });
    } catch (error) {
      console.error('Ошибка при выходе из комнаты:', error);
      socket.emit('roomError', {
        message: 'Ошибка при выходе из комнаты'
      });
    }
  });

  // Управление видео
  socket.on('videoPlay', async () => {
    if (!currentRoomId) return;
    
    try {
      await Room.findByIdAndUpdate(currentRoomId, {
        isPlaying: true,
        lastActivity: new Date()
      });
      socket.to(currentRoomId).emit('videoPlay');
    } catch (error) {
      console.error('Ошибка при обработке videoPlay:', error);
    }
  });

  socket.on('videoPause', async () => {
    if (!currentRoomId) return;
    
    try {
      await Room.findByIdAndUpdate(currentRoomId, {
        isPlaying: false,
        lastActivity: new Date()
      });
      socket.to(currentRoomId).emit('videoPause');
    } catch (error) {
      console.error('Ошибка при обработке videoPause:', error);
    }
  });

  socket.on('videoTimeUpdate', async (time) => {
    if (!currentRoomId) return;
    
    try {
      await Room.findByIdAndUpdate(currentRoomId, {
        currentVideoTime: time,
        lastActivity: new Date()
      });
      socket.to(currentRoomId).emit('videoSeek', time);
    } catch (error) {
      console.error('Ошибка при обработке videoTimeUpdate:', error);
    }
  });

  // Отправка сообщений
  socket.on('sendMessage', async (messageData) => {
  try {
    if (!messageData.roomId || !messageData.sender) {
      return socket.emit('error', { message: 'Не указана комната или отправитель' });
    }

    const newMessage = new ChatMessage({
      sender: messageData.sender,
      text: messageData.text,
      avatarUrl: messageData.avatarUrl,
      role: messageData.role,
      roomId: messageData.roomId,
      timestamp: new Date()
    });

    const savedMessage = await newMessage.save();
    io.to(messageData.roomId).emit('newMessage', savedMessage);
  } catch (error) {
    console.error('Ошибка сохранения сообщения:', error);
    socket.emit('error', { message: 'Ошибка при отправке сообщения' });
  }
});

  // Обработка отключения
  socket.on('disconnect', async () => {
    if (currentRoomId && currentUserId) {
      try {
        const [room, user] = await Promise.all([
          Room.findById(currentRoomId),
          User.findById(currentUserId)
        ]);

        if (room && user) {
          // Удаляем пользователя из комнаты
          room.users = room.users.filter(u => !u.userId.equals(currentUserId));
          room.lastActivity = new Date();
          await room.save();

          // Обновляем текущую комнату пользователя
          user.currentRoom = null;
          await user.save();

          // Уведомляем других участников
          socket.to(currentRoomId).emit('userLeft', {
            _id: currentUserId,
            login: user.login
          });

          // Если комната пуста или пользователь был создателем - удаляем комнату
          if (room.users.length === 0 || room.leader.equals(currentUserId)) {
            await Promise.all([
              Room.findByIdAndDelete(currentRoomId),
              ChatMessage.deleteMany({ roomId: currentRoomId })
            ]);
          } else {
            // Обновляем список пользователей для оставшихся
            const updatedRoom = await Room.findById(currentRoomId)
              .populate('users.userId', 'login avatarUrl')
              .select('users leader');

            if (updatedRoom) {
              const usersList = updatedRoom.users.map(u => ({
                id: u.userId._id,
                login: u.userId.login,
                avatarUrl: u.userId.avatarUrl,
                isLeader: updatedRoom.leader._id.equals(u.userId._id)
              }));
              io.to(currentRoomId).emit('usersInRoom', usersList);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при обработке отключения:', error);
      }
    }
  });

  // Обработка ошибок
  socket.on('error', (error) => {
    console.error('Ошибка WebSocket:', error);
  });
});

// Запуск сервера
server.listen(port, async () => {
  console.log(`Сервер запущен на порту ${port}`);
  await initAchievements();
  
  // Периодическая проверка ачивок
  setInterval(async () => {
    try {
      const users = await User.find();
      for (const user of users) {
        await checkAchievements(user);
      }
      console.log(`Проверены ачивки для ${users.length} пользователей`);
    } catch (e) {
      console.log("Ошибка периодической проверки ачивок:", e);
    }
  }, 24 * 60 * 60 * 1000); // Раз в день
});