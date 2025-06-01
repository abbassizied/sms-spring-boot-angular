
- [mysql - Docker Official Image](https://hub.docker.com/_/mysql)
- [phpMyAdmin - Docker Official Image](https://hub.docker.com/_/phpmyadmin)

- [postgres - Docker Official Image](https://hub.docker.com/_/postgres)
- [mongo - Docker Official Image](https://hub.docker.com/_/mongo)

```sh
# Navigate to the Docker Directory
$ cd "C:\Users\Zied\Desktop\Workshops\sms-spring-boot-angular\_docker"
# Start the Services
$ docker-compose -f mysql-phpmyadmin.yml up -d
# Stopping the Services
$ docker-compose -f mysql-phpmyadmin.yml down
```
- You can access the phpMyAdmin interface through your web browser, typically at ```http://localhost:8081``` (or whatever port you've configured in your ```mysql-phpmyadmin.yml``` file). This provides a web-based interface for managing your MySQL databases.





