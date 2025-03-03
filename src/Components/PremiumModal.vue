<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-body">
            <div class="modal-header">
                <h2>Премиум подписка</h2>
                <button class="close-button" @click="close">×</button>
            </div>
            <div class="buy_container">
                <div class="attributes_premium_subscribe">
                    <ul>
                        <li>Бесплатный доступ ко всем фильмам</li>
                        <li>Свечение аватара</li>
                        <li>Премиум Беседа</li>
                        <li>50 баллов за КТ</li>
                    </ul>
                </div>
                <div class="button_buy">
                    <button class="buy-button" @click="buyPremium">Купить за 5000 баллов</button>
                </div>
               
            </div>
         
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      close() {
        this.$emit('close');
      },
      buyPremium() {
        this.$emit('buy-premium');
      }
    }
  }
  </script>
  
  <style scoped>


  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #1e1e1e;
    border-radius: 10px;
    max-width: 750px;
    position: relative;
    height: 315px;
    background-image: url(../assets/Media/Main/premium_banner.png);
    background-position: center;
    background-size: cover;
    width: 100%;
    text-align: center;
  }

  .modal-body{
    position: absolute;
    height: 100%;
    align-content: space-between;
    display: grid;
    padding: 10px;
    width: 100%;
  }
  .buy_container{
    display: flex;
    width: 100%;
    color: #ffd700;
    justify-content: space-between;
  }

  .button_buy{
    display: grid;
    align-items: center;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .attributes_premium_subscribe{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 20px;
    text-align: left;
    color: #ffdf;
    font-size: 16px;
    font-weight: bold;
  }
  .modal-header h2 {
    margin: 0;
    color: #ffd700;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .premium-image {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .buy-button {
    background: #ffd700;
    color: #000;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  .buy-button:hover {
    background: #ffc107;
  }
  </style>