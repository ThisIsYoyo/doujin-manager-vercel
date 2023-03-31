# doujin-manager
用來管理同人誌的 django 網站

### 使用 python3.10.10 開發

### 前置
在 project 的根目錄
```bash
pip -r install requirement
```
安裝需求的 packages

進入 `doujin-manager/doujin_manager`
```bash
python manage.py migrate
```
做個 django 需要的 db

### 啟動
進入 `doujin-manager/doujin_manager`
```bash
python manage.py runserver
```

ref:
[API SPEC](https://app.swaggerhub.com/apis-docs/B850108CD/Doujinshi/1.0.0#/)
