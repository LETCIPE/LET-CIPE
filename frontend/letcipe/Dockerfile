FROM nginx
RUN apt-get update
RUN apt-get install npm -y

# 웹서버 설정파일 복사
# 프로젝트 루트 밑에 docker폴더, default.conf 생성
COPY ./frontend/letcipe/nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/dist

COPY ./frontend/letcipe/package*.json ./
# 모듈 설치
RUN npm install
# 소스 복사
COPY ./frontend/letcipe ./

# 빌드
RUN npm run build
# 컨테이너 실행시 시작
CMD [ "npm", "run", "start" ]
