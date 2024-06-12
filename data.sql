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

USE FindSomeOne;
