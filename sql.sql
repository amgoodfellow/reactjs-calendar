-- create terms
insert into terms(description, code, starttime, endtime, current) values('Winter Semester 2018', '201810', '1514782800000', '1527652800000', 'false'); 
insert into terms(description, code, starttime, endtime, current) values('Fall Semester 2017', '201740', '1504238400000', '1514696400000', 'false'); 
insert into terms(description, code, starttime, endtime, current) values('Summer Semester 2017', '201730', '1494216000000', '1503720000000', 'true'); 
insert into terms(description, code, starttime, endtime, current) values('Winter Semester 2017', '201710', '1483506000000', '1493179200000', 'false'); 
insert into terms(description, code, starttime, endtime, current) values('Fall Semester 2016', '201640', '1472702400000', '1481605200000', 'false'); 
insert into terms(description, code, starttime, endtime, current) values('Winter Semester 2016', '201610', '1451970000000', '1461643200000', 'false'); 

-- create course with meeting, instructor, grade for Summer 2017
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('48926', '0', 'RW', 'Web Register', 'SPN', 'Department of Modern Languages and Literatures', 'Intro Spanish Lang/Culture I', 'A two-semester sequence in the fundamentals of Spanish and Hispanic cultures. A beginning course. SPN 114 must be taken first. SPN 114 or 115 satisfies the university general education requirement in the foreign language and culture knowledge exploration area.', '201730', 'SPN', '114', '4', '005');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('48926', '08-MAY-2017', '28-JUN-2017', '9:00 AM', '11:47 AM', 'In-Person Class Meeting', 'CLAS', 'HH 489', 'Main Campus', 'Tuesday Thursday');
insert into instructors(crn, firstname, lastname, office, email) values('48926', 'Pablo', 'Neruda', 'CL 100', 'vienteneruda@oakland.edu');
insert into grades(crn, credit, grade) values('48926', '4', '2.7');

-- create course with meeting, instructor, grade for Summer 2017
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('16024', '0', 'RW', 'Web Register', 'FRH', 'French', 'Second Year French II', 'Two-semester sequence continuing the work of (FRH 114 or FRH 1140)-(FRH 115 or FRH 1150)with the addition of cultural and literary readings. (FRH 214 or FRH 2140) must be taken first. (Formerly FRH 215). (FRH 214 or FRH 2140) or (FRH 215 or FRH 2150) satisfies the university general education requirement in the foreign language and culture knowledge exploration area or the knowledge application integration area, not both. Prerequisite for knowledge application integration: completion of the university general education requirement in the foreign language and culture knowledge exploration area. Prerequisite(s): One year of college French or equivalent.', '201730', 'FRH', '215', '4', '002');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('16024', '08-MAY-2017', '28-JUN-2017', '12:00 PM', '2:47 PM', 'In-Person Class Meeting', 'CLAS', 'SFH 215', 'Main Campus', 'Monday Wednesday');
insert into instructors(crn, firstname, lastname, office, email) values('16024', 'Jacques', 'Cousteau', 'SEA 001', 'cousteau@oakland.edu');
insert into grades(crn, credit, grade) values('16024', '4', '4.0');

-- create course with meeting, instructor, grade
-- create course with meeting, instructor, grade for Summer 2017
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('17025', '0', 'RW', 'Web Register', 'PHY', 'Physics', 'Foundation of Modern Physics', 'Introduction to relativity, kinetic theory, quantization and atomic physics. Additional topics chosen from physics of molecules, solids, nuclei and elementary particles. Prerequisites: PHY 102 or PHY 152 and MTH 155 recommended; concurrent enrollment in PHY 317.', '201730', 'PHY', '371', '4', '001');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('17025', '08-MAY-2017', '28-JUN-2017', '3:00 PM', '4:47 PM', 'In-Person Class Meeting', 'CLAS', 'MSC 200', 'Main Campus', 'Monday');
insert into instructors(crn, firstname, lastname, office, email) values('17025', 'Marie', 'Curie', 'FRH 012', 'curie@oakland.edu');
insert into instructors(crn, firstname, lastname, office, email) values('17025', 'Richard', 'Feynman', 'CA 201', 'feynman@oakland.edu');
insert into grades(crn, credit, grade) values('17025', '4', '3.5');

-- create course with meeting, instructor, grade for Winter 2017
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('92033', '1', 'WL', 'Waitlist', 'ENG', 'English', 'Shakespeare Seminar', 'Analysis of four or five of the plays. Satisfies the university general education requirement for the capstone experience. Satisfies the university general education requirement for a writing intensive course in the major. Prerequisite for writing intensive: completion of the university writing foundation requirement. Prerequisite(s): ENG 211 and the three required 300-level British and American literary history courses; or permission of the instructor.', '201710', 'ENG', '4650', '4', '003');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('92033', '06-JAN-2016', '26-APR-2016', '1:00 PM', '2:47 PM', 'In-Person Class Meeting', 'CLAS', 'ODH 402', 'Main Campus', 'Friday');
insert into instructors(crn, firstname, lastname, office, email) values('92033', 'Ian', 'McEwan', 'GSG 003 ', 'mcewan23@oakland.edu');
insert into grades(crn, credit, grade) values('92033', '4', '3.8');

-- create course with meeting, instructor, grade for Fall 2016
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('15037', '0', 'RW', 'Web Register', 'BIO', 'Biological Sciences', 'Human Anatomy', 'The integration of organs into systems and systems into the organism. Selected aspects of developmental, comparative and microanatomy also will be discussed. Relevant to students in health sciences, biological science and liberal arts studies. Offered fall and winter semesters. Prerequisite: BIO 111.', '201640', 'BIO', '205', '4', '002');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('15037', '01-SEP-2016', '31-DEC-2016', '1:00 PM', '2:47 PM', 'In-Person Class Meeting', 'CLAS', 'ODH 402', 'Main Campus', 'Friday');
insert into instructors(crn, firstname, lastname, office, email) values('15037', 'Terry', 'Jerry', 'HS 689', 'jerryterry@oakland.edu');
insert into grades(crn, credit, grade) values('15037', '4', '3.0');

-- create course with meeting, instructor, grade for Fall 2016
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('44864', '0', 'RW', 'Web Register', 'SOC', 'Sociology', 'Intro to Sociology', 'Introduction to the basic concepts of sociology relating to the study of people as participants in group life. Particular attention is given to culture, socialization and self development, social class, and major social institutions. Satisfies the university general education requirement in the social science knowledge exploration area. Satisfies the university general education requirement in U.S. diversity.', '201640', 'SOC', '100', '4', '003');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('44864', '01-SEP-2016', '31-DEC-2016', '3:00 PM', '4:47 PM', 'In-Person Class Meeting', 'CLAS', 'HH 201', 'Main Campus', 'Wednesday');
insert into instructors(crn, firstname, lastname, office, email) values('44864', 'Daniel', 'Kahneman', 'SOC 202', 'dannykahneman@oakland.edu');
insert into instructors(crn, firstname, lastname, office, email) values('44864', 'Amos', 'Tversky', 'SOC 203', 'tversky@oakland.edu');
insert into grades(crn, credit, grade) values('44864', '3', '3.4');

-- create course with meeting, instructor, grade for Fall 2016
insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('10057', '0', 'RW', 'Web Register', 'CHM', 'Chemistry', 'General Chemistry I', 'Integrated lecture-laboratory. States of matter, atomic structure, bonding and molecular structure, chemical reactions. Recommended preparation is three years of high school mathematics and one year of high school chemistry. CHM 157 satisfies the university general education requirement in the natural science and technology knowledge exploration area. Prerequisite: Score of 20 or higher on ACT mathematics exam; or MTH 062.', '201640', 'CHM', '157', '4', '002');
insert into meetings(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus, meetday) values ('10057', '01-SEP-2016', '31-DEC-2016', '3:00 PM', '4:47 PM', 'In-Person Class Meeting', 'CLAS', 'MSC 302', 'Main Campus', 'Friday');
insert into instructors(crn, firstname, lastname, office, email) values('10057', 'Marie', 'Curie', 'FRH 012', 'curie@oakland.edu');
insert into grades(crn, credit, grade) values('10057', '3', '2.0');


-- create calendar meetings for summer 2017
insert into calmeetins (day, month, year, starttime, endtime, coursetype, buildingroom, campus, coursename, coursetitle) values (3, 5, 2017, '15:00pm', '18:00pm', 'lecture', 'DH 202', 'main campus', 'Sophomore Project', 'CSE 280');
insert into calmeetins (day, month, year, starttime, endtime, coursetype, buildingroom, campus, coursename, coursetitle) values (13, 5, 2017, '12:00pm', '14:00pm', 'lecture', 'DH 202', 'main campus', 'Sophomore Project', 'CSE 280');
-- That's enough for now

