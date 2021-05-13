# **PostmanAPI 同步機制**

**`Postman`** 是很好用的 HttpRequest 工具，個人使用沒有限制，但它的多人協作方案（Team，Business，Enterprise）是用 `user/month` 計費...太貴了...$_$

貧窮限制了我們的生產力，只好寫更多 Code 來彌補了！

此同步機制，使用 **`Postman API`** + **`Nodejs`** + **`Git`** 達成近似雲端協作的效果

---

## Prerequisites

1. 安裝 **`Postman`** 應用程式

2. 登入 **`Postman`** 帳號

## **Getting Started**

### **1. 取得API Key**

* 打開Postman應用程式 --> UserProfile Icon --> Account Settings

    ![01](README/screenshot/01.png)

* Postman API keys --> Generate API Key

    ![02](README/screenshot/02.png)

* 輸入任意識別名稱

    ![03](README/screenshot/03.png)

* 產生成功，把 Key 複製起來，貼到 `.env` 中

    ![04](README/screenshot/04.png)
    ![05](README/screenshot/05.png)

### **2. 安裝與設定**

* 安裝相依套件

    ```sh
    npm install
    ```

* 將 `.env.example` 複製並更名為 `.env`

    ```sh
    cp .env.example .env
    ```

* 把Step1中取得的API Key貼到 `.env` 中

    ```sh
    POSTMAN_APIKey=貼上你的APIKey
    TEAM_WORKSPACE_NAME=Team LinkChain
    ```

---

## **How to Use**

* 由檔案匯入至 **`Postman`**

    ```powershell
    npm run import
    ```

* 由 **`Postman`** 匯出至檔案

    ```powershell
    npm run export
    ```

* **`Git`** 同步

    ```sh
    git pull # 提取
    .
    .
    .
    git push # 推送
    ```

* 同步的Workspace ： **`Team LinkChain`**

---

## 使用案例

1. 第一次下載此Repository

    ```sh
    npm run import # 由檔案匯入至Postman
    ```

2. 之前已經匯入過，同事通知你有新的API內容

    ```powershell
    git pull # 提取
    ```

    ```powershell
    npm run import # 由檔案匯入至Postman
    ```

3. 你修改了一些API內容，想傳送給其他同事

    ```powershell
    npm run export # 匯出Postman至檔案
    ```

    ```bash
    git add .
    git commit -m "提交內容描述"
    ```

    ```bash
    git pull # 提取
    #
    # 若有衝突則先行解決
    #
    git push # 推送
    ```

---

## **分支原則**

* **`master`** ： 資料同步

* **`develop`** ： 核心程式開發

---

## **計費與限制**

透過 **`Postman API`** 存取資源，每分鐘不可超過 **`60`** 次Request，且每個月不可超過 **`1000`** 次Request，因此要省點用XD。

> x ： Collection數量
>
> y ： Environment數量

每次執行匯入或匯出指令， API Request 使用量為：

```sh
2 + x + y
```

目標是盡量降低 x 與 y ，建議每個專案的API就放在一個Collection裡面，Environment就固定使用四個。

---

## 參考資料

[https://www.postman.com/postman/workspace/postman-public-workspace](https://www.postman.com/postman/workspace/postman-public-workspace)