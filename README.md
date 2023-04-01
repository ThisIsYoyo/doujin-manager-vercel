# doujin-manager
用來管理同人誌的 django 網站

### 使用 python3.10.10 開發

### 前置
安裝需求的 packages
```bash
{user}:{path-to-doujin-manager}/doujin-manager/doujin_manager$ pip -r install requirement.txt
```

做個 django 需要的 db
```bash
{user}:{path-to-doujin-manager}/doujin-manager/doujin_manager$ python manage.py migrate
```

### 啟動
```bash
{user}:{path-to-doujin-manager}/doujin-manager/doujin_manager$ python manage.py runserver
```

### 透過 docker
```bash
{user}:{path-to-doujin-manager}/doujin-manager$ docker build -t doujin-manager .
{user}:{path-to-doujin-manager}/doujin-manager$ docker run -dp 8000:8000 doujin-manager
```
網站將會開在 localhost:8000

ref:
[API SPEC](https://app.swaggerhub.com/apis-docs/B850108CD/Doujinshi/1.0.0#/)
