
select
max(case t.dev_key when '1169089' then t.dev_temp_value else 0 end ) 'PM10',
max(case t.dev_key when '1169089' then t.dev_humi_value else 0 end ) 'PM2.5',

max(case t.dev_key when '1169090' then t.dev_humi_value else 0 end ) '噪声',

max(case t.dev_key when '1169091' then t.dev_temp_value else 0 end ) '温度',
max(case t.dev_key when '1169091' then t.dev_humi_value else 0 end ) '湿度',

max(case t.dev_key when '1169092' then t.dev_temp_value else 0 end ) '风力',
max(case t.dev_key when '1169092' then t.dev_humi_value else 0 end ) '风速',

max(case t.dev_key when '1169093' then t.dev_temp_value else 0 end ) '风向',

max(case t.dev_key when '1169095' then t.dev_humi_value else 0 end ) 'TPS',

max(case t.dev_key when '1169096' then t.dev_humi_value else 0 end ) '气压',
t.record_id, em.name monNama, bc.name communityName, t.ct_date
from env_monitor_record_detail t
left join env_monitor em on em.code = t.dev_addr
left join base_community bc on bc.id = em.community_id
where 1=1


group by record_id;

select * from env_monitor_record_detail;

select dev_humi_name paramName from env_monitor_record_detail where dev_humi_name != '' and dev_humi_name is not null group by dev_humi_name
union all
select dev_temp_name paramName from env_monitor_record_detail where dev_temp_name != '' and dev_temp_name is not null group by dev_temp_name;


-- 设备参数
select * from opc_eqp_type_param where deleted = 0;

-- 设备点位
select *  from opc_eqp_param where deleted = 0;

-- 设备监测记录
select * from opc_eqp_param_record where deleted = 0;
-- 设备预警记录
select * from opc_eqp_warn_record where deleted = 0;

select
max(case oep.eqp_param_type_id when '19' then opr.opc_value else 0 end ) 'PM10',
max(case oep.eqp_param_type_id when '24' then opr.opc_value else 0 end ) 'PM2.5',
        oep.eqp_param_type_id, opr.opc_value
from opc_eqp_param_record opr
left join opc_eqp_param oep on oep.id = opr.eqp_param_id
left join opc_eqp_type_param otp on otp.id = oep.eqp_param_type_id
group by otp.eqp_type_id;

--
select otp.id, otp.name, otp.eqp_type_id from opc_eqp_type_param otp
order by otp.eqp_type_id;

select
       max(case w.type_parm_id when '19' then cast(opr.opc_value as char(50)) else 0 end ) 'PM10',
        max(case w.type_parm_id when '24' then opr.opc_value else 0 end ) 'PM2.5',
       max(case w.type_parm_id when '25' then opr.opc_value else 0 end ) '温度',
       max(case w.type_parm_id when '26' then opr.opc_value else 0 end ) '湿度',
       w.eqp_type_id, opr.ct_date
from opc_eqp_param_record opr
left join
         (select otp.eqp_type_id, otp.id type_parm_id, oep.id
         from opc_eqp_param oep
        left join opc_eqp_type_param otp on otp.id = oep.eqp_param_type_id) w
         on w.id = opr.eqp_param_id
where w.eqp_type_id = 8;
-- group by w.eqp_type_id


select
       max(case w.type_parm_id when '19' then cast(opr.opc_value as char(50)) else 0 end ) '19',
       max(case w.type_parm_id when '24' then cast(opr.opc_value as char(50)) else 0 end ) '24',
       max(case w.type_parm_id when '25' then cast(opr.opc_value as char(50)) else 0 end ) '25',
       max(case w.type_parm_id when '26' then cast(opr.opc_value as char(50)) else 0 end ) '26',
       max(case w.type_parm_id when '31' then cast(opr.opc_value as char(50)) else 0 end ) '31',
       w.eqp_type_id, opr.ct_date
from opc_eqp_param_record opr
         left join (select otp.eqp_type_id, otp.id type_parm_id,otp.param_type type,otp.name, oep.id
                    from opc_eqp_type_param otp
                           left join opc_eqp_param oep  on otp.id = oep.eqp_param_type_id
                   where otp.deleted = 0)
    w on w.id = opr.eqp_param_id where w.eqp_type_id = 8;

select max(case when otp.id = 35 then opr.opc_value else 0 end) as '35',
                             max(case when otp.id = 36 then opr.opc_value else 0 end) as '36',
                             opr.id,opr.ct_date, oe.name eqpName
                      from opc_eqp_param_record opr
                             left join opc_eqp_param oep on oep.id = opr.eqp_param_id
                             left join opc_eqp_type_param otp on otp.id = oep.eqp_param_type_id
                             left join opc_eqp oe on oe.id = opr.eqp_id where 1=1 and otp.eqp_type_id = 12
                      group by opr.eqp_id, opr.ct_date
                      order by ct_date desc



select bu.id, bu.name, bu.code, bb.name buildingName, ba.name areaName, bc.name communityName
from base_community_unit bu
left join base_community_building bb on bb.id = bu.building_id
left join base_community_area ba on ba.id = bb.area_id
left join base_community bc on bc.id = ba.community_id
where bu.deleted = 0
and bb.id =
    and ba.id =
    and bc.id =

 select
    t.*,
    bc.name communityName,
 bb.name,
    CONCAT(bc.name,'>',bb.name, '>', ba.name, '>', bu.name) fullUnitName
    from opc_eqp t
    left join base_community bc on bc.id = t.community_id
    left join base_community_area ba on ba.id = t.area_id
    left join base_community_building bb on bb.id = t.building_id
    left join base_community_unit bu on bu.id = t.unit_id;
		
--		
select * from opc_eqp oe where oe.id = 29
;
	
--
select * from opc_eqp_param op 
where op.eqp_id in (29 )

-- 		
select * from opc_eqp_param_record oe
where 1=1
-- and oe.eqp_id in (28, 90, 91, 92 )
and oe.eqp_param_id in (121 ,330, 331, 332)   --  121  330 331 332
order by oe.id desc

-- 单个电表 每日 数据
select * from  opc_eqp_param_record_daily od
where 1=1
and od.eqp_param_id in (121 ,330, 331, 332)
order by id desc

insert into opc_eqp_param_record_daily (eqp_param_id, amount, currval, day, month, year, ct_date)
values 
('332', '512.0000', '38405.0000', '2020-10-20 00:00:00', '202010', '2020', now()),
('331', '412.0000', '51971.0000', '2020-10-20 00:00:00', '202010', '2020', now()),
('330', '768.0000', '53254.0000', '2020-10-20 00:00:00', '202010', '2020', now()),
('121', '312.0000', '8964.0000',  '2020-10-20 00:00:00', '202010', '2020', now()),

('332', '502.0000', '38405.0000', '2020-10-21 00:00:00', '202010', '2020', now()),
('331', '510.0000', '51971.0000', '2020-10-21 00:00:00', '202010', '2020', now()),
('330', '708.0000', '53254.0000', '2020-10-21 00:00:00', '202010', '2020', now()),
('121', '418.0000', '8964.0000',  '2020-10-21 00:00:00', '202010', '2020', now())



-- 水表数据
select * from opc_eqp_param_record_daily od
where 1=1
and od.eqp_param_id in (122)
order by id desc

-- 月度用水量
select *,t.value valueStr  from water_month_record t where t.year = 2019
    order by t.month_year asc

-- 车辆数据
insert into vehicle_gate_admission_record (park_number, plate, plate_color, in_time, in_channel, visit_reason, user_name, user_phone, ct_date, deleted)
VALUES 
('p180124101457', '鲁 Lw0662', '蓝牌', '2020-10-22 8:11:33', '东入口', '', '张丹', '13562541235', now(), 0),
('p180124101457', '鲁 L90B89', '蓝牌', '2020-10-22 8:10:33', '东入口', '拜访朋友', '乔宁', '18906337873', now(), 0),
('p180124101457', '鲁 LR1349', '蓝牌', '2020-10-22 9:38:33', '东入口', '', '陈建国', '16308772360', now(), 0),
('p180124101457', '鲁 L7D012', '蓝牌', '2020-10-22 6:43:33', '东入口', '', '林丽', '15559831101', now(), 0)
;

insert into vehicle_gate_exit_record (park_number, plate, plate_color, out_time, open_gate_mode, deleted, ct_date)
VALUES
('p190718120344', '鲁 L96B00', '蓝牌', '2020-10-22 7:10:33', '摄像机开闸', 0, now()),
('p190718120344', '鲁 Lw3305', '蓝牌', '2020-10-22 5:15:33', '摄像机开闸', 0, now()),
('p190718120344', '鲁 LZC712', '蓝牌', '2020-10-22 8:15:33', '摄像机开闸', 0, now())


select * from door_open_record where record_id = '-1' ORDER BY open_date_time desc

insert into door_open_record
-- 门禁数据
(record_id, device_id, open_date, open_time, open_date_time, card_no, position, open_type)
values
('-1', '-1', '2020-09-29', '06:13:36', '2020-09-29 06:13:36', '3711418199', '3栋1单元', '刷卡开门'),
('-1', '-1', '2020-09-29', '07:13:36', '2020-09-29 07:13:36', '1016652511', '8栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '05:13:36', '2020-09-29 05:13:36', '3811811991', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '06:53:36', '2020-09-29 06:53:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '07:05:36', '2020-09-29 07:05:36', '1782370688', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '08:03:36', '2020-09-29 08:03:36', '1719923442', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '08:53:36', '2020-09-29 08:53:36', '3711418199', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '05:23:36', '2020-09-29 05:23:36', '3811811991', '2栋2单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '07:13:36', '2020-09-29 07:13:36', '3811378167', '3栋1单元', '刷卡开门'),
('-1', '-1', '2020-09-29', '08:13:36', '2020-09-29 08:13:36', '3811811991', '8栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '04:23:36', '2020-09-29 04:23:36', '1369135648', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '03:33:36', '2020-09-29 03:33:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:23:36', '2020-09-29 08:23:36', '3811811991', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '09:13:36', '2020-09-29 09:13:36', '1369135648', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '06:33:36', '2020-09-29 06:33:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '01:23:36', '2020-09-29 01:23:36', '1719916242', '2栋2单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '00:13:36', '2020-09-29 00:13:36', '3711418199', '3栋1单元', '刷卡开门'),
('-1', '-1', '2020-09-29', '08:45:36', '2020-09-29 08:45:36', '1016652511', '8栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '08:03:36', '2020-09-29 08:03:36', '3811811991', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:53:36', '2020-09-29 08:53:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:23:36', '2020-09-29 08:23:36', '1782370688', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '07:33:36', '2020-09-29 07:33:36', '1719923442', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '07:51:36', '2020-09-29 07:51:36', '3711418199', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '06:55:36', '2020-09-29 06:55:36', '3811811991', '2栋2单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:22:36', '2020-09-29 08:22:36', '3811378167', '3栋1单元', '刷卡开门'),
('-1', '-1', '2020-09-29', '06:19:36', '2020-09-29 06:19:36', '3811811991', '8栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '07:20:36', '2020-09-29 07:20:36', '1369135648', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:23:36', '2020-09-29 08:23:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '-1', '2020-09-29', '08:25:36', '2020-09-29 08:25:36', '3811811991', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '09:13:36', '2020-09-29 09:13:36', '1369135648', '2栋2单元', '人脸开门'),
('-1', '-1', '2020-09-29', '06:33:36', '2020-09-29 06:33:36', '3708164471', '7栋1单元', '蓝牙开门')



-- 名筑南大门门禁数据
insert into door_open_record
(record_id, device_id, open_date, open_time, open_date_time, card_no, position, open_type)
values
('-1', '880100522', '2020-09-29', '06:13:36', '2020-05-22 06:13:36', '3711418199', '3栋1单元', '刷卡开门'),
('-1', '880100522', '2020-09-29', '07:13:36', '2020-05-22 07:13:36', '1016652511', '8栋2单元', '人脸开门'),
('-1', '880100522', '2020-09-29', '05:13:36', '2020-05-22 05:13:36', '3811811991', '7栋1单元', '蓝牙开门'),
('-1', '880100522', '2020-09-29', '06:53:36', '2020-05-22 06:53:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '880100522', '2020-09-29', '07:05:36', '2020-05-22 07:05:36', '1782370688', '2栋2单元', '人脸开门'),
('-1', '880100522', '2020-09-29', '08:03:36', '2020-05-22 08:03:36', '1719923442', '2栋2单元', '人脸开门'),
('-1', '880100522', '2020-09-29', '08:53:36', '2020-05-22 08:53:36', '3711418199', '7栋1单元', '蓝牙开门')
;

-- 名筑西大门门禁数据
insert into door_open_record
(record_id, device_id, open_date, open_time, open_date_time, card_no, position, open_type)
values
('-1', '880201575', '2020-09-29', '06:13:36', '2020-05-22 06:13:36', '3711418199', '3栋1单元', '刷卡开门'),
('-1', '880201575', '2020-09-29', '07:13:36', '2020-05-22 07:13:36', '1016652511', '8栋2单元', '人脸开门'),
('-1', '880201575', '2020-09-29', '05:13:36', '2020-05-22 05:13:36', '3811811991', '7栋1单元', '蓝牙开门'),
('-1', '880201575', '2020-09-29', '06:53:36', '2020-05-22 06:53:36', '3708164471', '7栋1单元', '蓝牙开门'),
('-1', '880201575', '2020-09-29', '07:05:36', '2020-05-22 07:05:36', '1782370688', '2栋2单元', '人脸开门'),
('-1', '880201575', '2020-09-29', '08:03:36', '2020-05-22 08:03:36', '1719923442', '2栋2单元', '人脸开门'),
('-1', '880201575', '2020-09-29', '08:53:36', '2020-05-22 08:53:36', '3711418199', '7栋1单元', '蓝牙开门')
;

insert into opc_eqp_param_record_daily
(eqp_param_id, amount, currval, day, month, year, ct_date)
values
(332, )
(331, )
(330, )
(121, )

select * from  env_monitor_record_detail order by id desc limit 100




