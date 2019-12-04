# MySQL dump to CSV
This nodejs script simply convert mysqldump file to csv format, withe different tables save in different files, and with its headers in the first line.

Inspired by [mysqldump](https://github.com/jamesmishra/mysqldump-to-csv)

## Usage

download the script `sql-to-csv.js`, then run

```
node sql-to-csv.js <source .sql file path> <outputfile directory path>
```

## Example

Turn the following sql:

```
-- ----------------------------
-- Table structure for t_law
-- ----------------------------
DROP TABLE IF EXISTS `t_law`;
CREATE TABLE `t_law` (
  `ID` varchar(60) NOT NULL,
  `JGBM` varchar(50) DEFAULT NULL 
  `FZR` varchar(12) DEFAULT NULL 
  `FZJG` varchar(12) DEFAULT NULL
  `CZHM` varchar(30) DEFAULT NULL
  `LXDH` varchar(30) DEFAULT NULL 
  `JGDM` varchar(50) DEFAULT NULL
  `GFWZ` varchar(200) DEFAULT NULL,
  `JGQYCJ` varchar(4) DEFAULT NULL
  `YB` varchar(12) DEFAULT NULL 
  `FZSJ` datetime DEFAULT NULL 
  `DZYX` varchar(60) DEFAULT NULL
  `DZ` varchar(60) DEFAULT NULL 
  `JGMC` varchar(200) DEFAULT NULL
  `JGJC` varchar(50) DEFAULT NULL
  `ZYQY` char(1) DEFAULT NULL 
  `SJSFXZJGBM` varchar(50) DEFAULT NULL 
  `JGJJ` varchar(500) DEFAULT NULL 
  `ZT` char(1) DEFAULT NULL COMMENT
  `CZSJ` datetime DEFAULT NULL 
  `WYBM` int(19) DEFAULT NULL 
  `XZQH` varchar(6) DEFAULT NULL 
  PRIMARY KEY (`ID`),
  KEY `inx_organ_gz_fzr` (`FZR`),
  KEY `inx_organ_gz_jgmc` (`JGMC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 

INSERT INTO `t_law` VALUES ('a1f3478785a111e8a23d001e67c714e3', '34010010008', '22', null, null, '22', null, null, null, null, null, null, '222', '22', null, null, null, '222', '0', '2018-07-12 15:09:59', null, '340100');
```

into csv file `t_law.csv`:

```
ID,JGBM,FZR,FZJG,CZHM,LXDH,JGDM,GFWZ,JGQYCJ,YB,FZSJ,DZYX,DZ,JGMC,JGJC,ZYQY,SJSFXZJGBM,JGJJ,ZT,CZSJ,WYBM,XZQH
'a1f3478785a111e8a23d001e67c714e3', '34010010008', '22', null, null, '22', null, null, null, null, null, null, '222', '22', null, null, null, '222', '0', '2018-07-12 15:09:59', null, '340100'
```




## Caustion

When fields have commas inside, e.g. `..., 'hello,world', ...`, the CSV parser may fail dealing with these fields.

So, you may need to fix this problem by yourself. 


