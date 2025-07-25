# 📋 Task Flow – React Native To-Do App

Task Flow is a mobile-first task management app built with **React Native** and **Node.js + Express**, inspired by a clean drag-and-drop web UI. It helps you manage tasks through clear stages:

🟡 **New** → 🔵 **Working** → 🟢 **Completed** → ❌ **Deleted**

---

## ✨ Features

- ✅ **Add New Tasks**
- 🔁 **Move Tasks Between Stages** (`New`, `Working`, `Completed`)
- ❌ **Delete Tasks** with soft-delete history
- 📊 **Live Task Counts**
- 📱 **Mobile-Optimized UI** (via React Native + Expo)
- 🔌 **REST API backend** with easy-to-extend structure

---

## 🛠 Tech Stack

| Frontend            | Backend            |
|---------------------|--------------------|
| React Native (Expo) | Node.js + Express  |
| React Hooks         | REST API           |
| Axios               | In-memory Storage (JSON) |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/task-flow.git
cd task-flow
```



### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend (React Native with Expo)

```bash
cd frontend
npm install
npm start
```

> 💡 **Ensure your mobile device and development machine are on the same Wi-Fi network.**

### 3. Open the App

* Scan the QR code using **Expo Go** (Android)
* Or use the **Expo CLI** options to open the app:

  * Press `a` for Android
  * Press `w` for Web

---

## 📁 Project Structure

```
task-flow/
├── backend/          # Express.js backend
│   └── index.js      # API routes and task logic
├── frontend/         # React Native app
│   └── App.js        # Main app file
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | `/tasks`      | Get all tasks              |
| POST   | `/tasks`      | Add new task               |
| PUT    | `/tasks/move` | Move task between sections |
| DELETE | `/tasks`      | Delete a task              |

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the repo and submit improvements or bug fixes.

---

## 📄 License

MIT License

---

## ✍️ Author

**Nandana** – *Inspired by a web-based drag-and-drop interface*

---

> Built with 💛 using React Native + Node.js




