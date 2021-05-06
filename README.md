# **PostmanAPI 同步機制**

**`Postman`** 是很好用的 HttpRequest 工具，個人使用沒有限制，但它的多人協作方案（Team，Business，Enterprise）是用 `user/month` 計費...太貴了...$_$

貧窮限制了我們的生產力，只好寫更多 Code 來彌補了！

此同步機制，使用 `Postman API` + `Nodejs` + `Git` 達成近似雲端協作的效果

---

## **Getting Started**

### **1. 取得API Key**

打開Postman應用程式 --> UserProfile Icon --> Account Settings

![01](README/screenshot/01.png)

Postman API keys --> Generate API Key

![02](README/screenshot/02.png)

輸入任意識別名稱

![03](README/screenshot/03.png)

產生成功，把 Key 複製起來，貼到 `.env` 中

![04](README/screenshot/04.png)
![05](README/screenshot/05.png)
