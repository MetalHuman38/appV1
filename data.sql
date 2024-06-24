SSLEngine on
SSLCertificateFile /etc/ssl/certs/metalbrain.net.crt
SSLCertificateKeyFile /etc/ssl/certs/metalbrain.net.key
SSLCertificateChainFile /etc/ssl/certs/metalbrain.net_ca_bundle.crt


CREATE USER metalbrain@localhost IDENTIFIED VIA mysql_native_password USING '*057E30A11C22BB0D4CCF5F03868F01A727E48134';
CREATE USER metalbrain@localhost IDENTIFIED VIA mysql_native_password USING 'hashedpassword';

-- Create the user 'metalbrain' identified by a hashed password
CREATE USER 'metalbrain'@'localhost' IDENTIFIED VIA mysql_native_password USING 'hashedpassword';

-- Grant all privileges on all databases and tables with the ability to grant these privileges to others
GRANT ALL PRIVILEGES ON *.* TO 'metalbrain'@'localhost' WITH GRANT OPTION;

-- Flush privileges to ensure that the changes take effect
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user;

SHOW GRANTS FOR 'metalbrain'@'localhost';

SELECT CONCAT('SHOW GRANTS FOR ''', User, '''@''', Host, ''';') AS query
FROM mysql.user;

DROP DATABASE IF EXISTS FindSomeOne;
CREATE DATABASE FindSomeOne ...;

DROP TABLE IF EXISTS ImageStorages;

USE FindSomeOne;

SET foreign_key_checks = 0;
-- Drop tables
drop table ...
-- Drop views
drop view ...
SET foreign_key_checks = 1;

npx webpack init

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Posts;
SET FOREIGN_KEY_CHECKS = 1;

DELETE FROM Posts;

DELETE FROM Saves;

QueryInterface.createTable('Posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

