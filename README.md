# 餐廳清單
一個使用 Node.js + Express 製作的餐廳清單

## 功能 

=======

1. 使用者可以註冊帳號，也可以透過facebook登入
2. 使用者必須登入才能進入餐廳菜單，登入後可以使用以下功能
   (1) 使用者可以新增一家餐廳
   (2) 使用者可以瀏覽一家餐廳的詳細資訊
   (3) 使用者可以瀏覽全部所有餐廳
   (4) 使用者可以修改一家餐廳的資訊
   (5) 使用者可以刪除一家餐廳
   (6) 使用者可以透過搜尋餐廳名稱(中英文)、類別來找到特定餐廳  
      a 搜尋欄位前後有空白的話，會先將其去除  
      b 如果沒有搜尋到東西，會顯示沒有找到
3. 使用者登入或註冊失敗會顯示訊息提醒

## 安裝流程 

1. 打開 terminal, clone 此專案
   ```
   git clone https://github.com/alvinkane/3-A1-restaurant-list.git
   ```
2. 移到存取的資料夾(3-A1-restaurant-list)
   ```
   cd 3-A1-restaurant-list
   ```
3. 安裝 npm 套件
   ```
   npm install
   ```
4. 安裝 nodemon 套件(若有可省略)
5. 在專案內創造一個 env 檔案，可直接複製.env.example檔案，並將SKIP修改為自己的
   ```
   MONGODB_ENV=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/restaurant-list?retryWrites=true&w=majority
   FACEBOOK_ID=<應用程式編號>
   FACEBOOK_SECRET=<應用程式密鑰>
   ```
6. 匯入種子檔案
   ```
   npm run seed
   ```
7. 出現'mongodb connected!' 'done' 代表成功
8. 執行專案
   ```
   npm run dev
   ```
9. 出現 "This is listening on http://localhost:3000" 'mongodb connected'代表成功
10. 開啟任一瀏覽器輸入 This is listening on http://localhost:3000

## 畫面   
![image](/image/login.png)

## 種子資料帳密

### 第一位使用者 
    email: user1@example.com
    password: 12345678
### 第二位使用者 
    email: user2@example.com
    password: 12345678

## 使用版本
node: 14.16.0  
npm: 6.14.11  
nodemon: 2.0.21
