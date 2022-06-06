# [IdeaStorm](https://ideastorm.social)

## Instalacijske instrukcije za IdeaStorm

Instukcije za instalaciju IdeaStorm stranice za local development


### Preduvjeti

Trebati će vam:

- Docker [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- nodejs [https://nodejs.org/en/](https://nodejs.org/en/)
- git [https://git-scm.com/](https://git-scm.com/)
  
### Kopirajte GitHub repozitorij

```bash
git clone https://github.com/codemodemc2/codemode.git
```


### ENV datoteke

Promjenite mapu u `/codemode/apps/server`

Napravite novu `.env` datoteku

i ispunite ju sa sljedećim podatcima

```
PORT=8080
NODE_ENV=development ili production
COOKIE_SECRET=random string
DBURL=mongodb://localhost
DBNAME=ideastorm
NGINX_ENABLED=false
REDIS_PASSWORD=null
GITHUB_SECRET=null
FRONTEND_URL=http://localhost:3000
```

Promjenite mapu u `/codemode/apps/client`

Napravite novu `.env` datoteku

i ispunite ju sa sljedećim podatcima

```
VITE_BASE_URL=http://localhost:8080/v1/
```

