# IdeaStorm

## Instalacijske instrukcije za IdeaStorm

Instukcije za instalaciju IdeaStorm stranice na Ubuntu server

### Preduvjeti
Trebati će vam:
- Server sa operativnim sustavum Ubuntu 18.04 or Ubuntu 20.04 sa barem 1GM RAM-a
- Registrirana domena

### Kopirajte GitHub repozitorij
```bash
git clone https://github.com/codemodemc2/codemode.git
```

### Instalirajte Nginx ([ref](https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview))
```bash
sudo apt update
sudo apt install nginx
```

Kopirajte datoteku iz mape `~/codemode/apps/server/nginx.conf` u mapu `/etc/nginx/sites-available`.
Te kopirajte tu datoteku u mapu `/etc/nginx/sites-enabled`
```bash
ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled
```

### Instalirajte Redis ([ref](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04))
```
sudo apt update
sudo apt install redis-server
```

Otvorite `redis.conf` konfiguracijsku datoteku
```
sudo nano /etc/redis/redis.conf
```

Uredite liniju gde možete mijenjati direktivu `supervised`
```
supervised systemd
```

Nakon što spremite datoteku ponovno pokrenite redis
```
sudo systemctl status redis
```

### ENV datoteke
Promjenite mapu u `~/codemode/apps/server`

Napravite novu `.env` datoteku
```
nano .env
```
i ispunite ju sa sljedećim podatcima

```
PORT=
NODE_ENV=
COOKIE_SECRET=
DBURL=
DBNAME=
NGINX_ENABLED=
REDIS_PASSWORD=
GITHUB_SECRET=
FRONTEND_URL=
```


### Instalirajte najnoviju verziju `node.js`-a ([upute](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04))

### Instalirajte `pm2`
```
npm install pm2 -g
```


