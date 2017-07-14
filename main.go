package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"

	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	//Term table creation.
	termSQL = "create table if not exists terms(id serial primary key, description text, code text, starttime text, endtime text, current text)"

	//Course table creation.
	courseSQL = "create table if not exists courses(id serial primary key, crn text, waitlistpos text, registrationstatus text, registrationdescription text, departmentcode text, departmentdescription text, coursetitle text, coursedescription text, termcode text, subjectcode text, subjectnumber text, credit text, section text)"

	//Meeting table creation.
	meetingSQL = "create table if not exists meetings(id serial primary key, crn text, startday text, startmonth text, startyear text, endday text, endmonth text, endyear text, starttime text, endtime text, coursetype text, coursetypecode text, buildingroom text, campus text, meetday text)"

	//Calendar meeting table creation
	meetingCalendarSQL = "create table if not exists calmeetins(id serial primary key, day text, month text, year text, starttime text, endtime text, coursetype text, buildingroom text, campus text, coursename text, coursetitle text, color text)"

	//meetingSQL = "create table if not exists meeting(id serial primary key, crn text, startdate text, enddate text, starttime text, endtime text, coursetype text, coursetypecode text, buildingroom text, campus text, meetdays text, starthour text, startminutes text, startmonth text, startyear text, startdayofmonth text, startdayofweek text, startweekofmonth text, endhour text, endminutes text, endmonth text, endyear text, enddayofmonth text, enddayofweek text, endweekofmonth text)"
	//Instructor table creation.
	instructorSQL = "create table if not exists instructors(id serial primary key, crn text, firstname text, lastname text, office text, email text)"

	//Grade table creation.
	gradeSQL = "create table if not exists grades(id serial primary key, credit text, grade text, crn text)"
)

// Configurations for the database
type config struct {
	URL      string
	Username string
	Password string
	Dbname   string
}

// Term represents the current time period that will be displayed (e.g Winter Semester 2018, Fall Semester 1989).
type Term struct {
	ID          int
	Description string `json:"description"`
	Code        string `json:"code"`
	Start       string `json:"start"`
	End         string `json:"end"`
	Current     string `json:"current"`
}

// Course represents the class that is assosciated with a given term (e.g Introduction to Golang).
type Course struct {
	ID                            int
	Crn                           string       `json:"crn"`
	WaitlistPos                   string       `json:"waitlistPost"`
	RegistrationStatus            string       `json:"registrationStatus"`
	RegistrationStatusDescription string       `json:"registrationStatusDescription"`
	DepartmentCode                string       `json:"departmentCode"`
	DepartmentDescription         string       `json:"departmentDescription"`
	CourseTitle                   string       `json:"courseTitle"`
	CourseDescription             string       `json:"courseDescription"`
	TermCode                      string       `json:"termCode"`
	SubjectCode                   string       `json:"subjectCode"`
	SubjectNumber                 string       `json:"subjectNumber"`
	Section                       string       `json:"section"`
	Credit                        string       `json:"credit"`
	Meetings                      []Meeting    `json:"meetings"`
	Instructors                   []Instructor `json:"instructors"`
	Grade                         Grade        `json:"grade"`
}

// Meeting represents the times and locations a course will gather (e.g. Monday at 1:47 PM).
type Meeting struct {
	ID             int
	Crn            string `json:"crn"`
	StartDate      string `json:"startDate"`
	EndDate        string `json:"endDate"`
	StartTime      string `json:"startTime"`
	EndTime        string `json:"endTime"`
	CourseType     string `json:"courseType"`
	CourseTypeCode string `json:"courseTypeCode"`
	BuildingRoom   string `json:"buildingRoom"`
	Campus         string `json:"campus"`
	MeetDays       string `json:"meetDays"`
}

//Instructor represents the person(s) who will teach a course.
type Instructor struct {
	ID        int
	Crn       string `json:"crn"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Office    string `json:"office"`
	Email     string `json:"email"`
}

// Grade represents the score the student received for a course.
type Grade struct {
	ID     int
	Credit string `json:"credit"`
	Grade  string `json:"grade"`
	Crn    string `json:"crn"`
}

type MeetingCalendar struct {
	ID           int
	Day          string `json:"day"`
	Month        string `json:"month"`
	Year         string `json:"year"`
	StartTime    string `json:"starttime"`
	EndTime      string `json:"endtime"`
	BuildingRoom string `json:"buildingroom"`
	Campus       string `json:"campus"`
	CourseType   string `json:"coursetype"`
	CourseName   string `json:"coursename"`
	CourseTitle  string `json:"coursetitle"`
	Color        string `json:"color"`
}

type MeetingCalendarArray []MeetingCalendar

// LanguageStrings represents words that will be internationalized
type LanguageStrings struct {
	Monday    string `json:"Monday"`
	Mon       string `json:"Mon"`
	Tuesday   string `json:"Tuesday"`
	Tue       string `json:"Tue"`
	Wednesday string `json:"Wednesday"`
	Wed       string `json:"Wed"`
	Thrusday  string `json:"Thursday"`
	Thu       string `json:"Thu"`
	Friday    string `json:"Friday"`
	Fri       string `json:"Fri"`
	Saturday  string `json:"Saturday"`
	Sat       string `json:"Sat"`
	Sunday    string `json:"Sunday"`
	Sun       string `json:"Sun"`
	January   string `json:"January"`
	Jan       string `json:"Jan"`
	February  string `json:"February"`
	Feb       string `json:"Feb"`
	March     string `json:"March"`
	Mar       string `json:"Mar"`
	April     string `json:"April"`
	Apr       string `json:"Apr"`
	May       string `json:"May"`
	June      string `json:"June"`
	Jun       string `json:"Jun"`
	July      string `json:"July"`
	Jul       string `json:"Jul"`
	August    string `json:"August"`
	Aug       string `json:"Aug"`
	September string `json:"September"`
	Sep       string `json:"Sep"`
	October   string `json:"October"`
	Oct       string `json:"Oct"`
	November  string `json:"November"`
	Nov       string `json:"Nov"`
	December  string `json:"December"`
	Dec       string `json:"Dec"`
	Week      string `json:"Week"`
	Schedule  string `json:"Schedule"`
	Month     string `json:"Month"`
	Am7       string `json:"7am"`
	Am8       string `json:"8am"`
	Am9       string `json:"9am"`
	Am10      string `json:"10am"`
	Am11      string `json:"11am"`
	Pm12      string `json:"12pm"`
	Pm1       string `json:"1pm"`
	Pm2       string `json:"2pm"`
	Pm3       string `json:"3pm"`
	Pm4       string `json:"4pm"`
	Pm5       string `json:"5pm"`
	Pm6       string `json:"6pm"`
	Pm7       string `json:"7pm"`
	Pm8       string `json:"8pm"`
	Pm9       string `json:"9pm"`
	Pm10      string `json:"10pm"`
	Pm11      string `json:"11pm"`
}

func courses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var courses []Course

	s := struct {
		Term string `json:"code"`
	}{}

	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	termCode := s.Term

	rows, err := db.Query("select * from courses where termcode = $1", termCode)
	if err != nil {
		fmt.Printf("Failed on courses for termcode %s\n", termCode)
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var c Course
		if err := rows.Scan(&c.ID, &c.Crn, &c.WaitlistPos, &c.RegistrationStatus, &c.RegistrationStatusDescription, &c.DepartmentCode, &c.DepartmentDescription, &c.CourseTitle, &c.CourseDescription, &c.TermCode, &c.SubjectCode, &c.SubjectNumber, &c.Credit, &c.Section); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		} else {
			instructorRows, err := db.Query("select * from instructors where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on instructors for crn %s\n", c.Crn)
				panic(err)
			}
			defer instructorRows.Close()

			for instructorRows.Next() {
				var i Instructor
				if err := instructorRows.Scan(&i.ID, &i.Crn, &i.FirstName, &i.LastName, &i.Office, &i.Email); err != nil {
					fmt.Println("error on instructors")
					panic(err)
				} else {
					c.Instructors = append(c.Instructors, i)
				}
			}

			meetingRows, err := db.Query("select * from meetings where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on meetings for crn %s\n", c.Crn)
				panic(err)
			}
			defer meetingRows.Close()

			for meetingRows.Next() {
				var m Meeting
				if err := meetingRows.Scan(&m.ID, &m.Crn, &m.StartDate, &m.EndDate, &m.StartTime, &m.EndTime, &m.CourseType, &m.CourseTypeCode, &m.BuildingRoom, &m.Campus, &m.MeetDays); err != nil {
					fmt.Println("error on meetings")
					panic(err)
				} else {
					c.Meetings = append(c.Meetings, m)
				}
			}

			var g Grade
			err = db.QueryRow("select * from grades where crn = $1", c.Crn).Scan(&g.ID, &g.Credit, &g.Grade, &g.Crn)
			if err != nil {
				fmt.Printf("Failed on grades for crn %s\n", c.Crn)
				panic(err)
			}

			c.Grade = g
			courses = append(courses, c)
		}
	}

	course := struct {
		Course []Course `json:"courses"`
	}{
		courses,
	}

	if err := json.NewEncoder(w).Encode(course); err != nil {
		panic(err)
	}
}

func terms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var terms []Term
	rows, err := db.Query("select * from terms")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var t Term
		if err := rows.Scan(&t.ID, &t.Description, &t.Code, &t.Start, &t.End, &t.Current); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		}
		terms = append(terms, t)

	}

	term := struct {
		Term []Term `json:"terms"`
	}{
		terms,
	}

	if err := json.NewEncoder(w).Encode(term); err != nil {
		panic(err)
	}
}

func calendarMeeting(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var meetings MeetingCalendarArray

	rows, err := db.Query("select * from calmeetins order by year, month, day, starttime")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var t MeetingCalendar
		if err := rows.Scan(&t.ID, &t.Day, &t.Month, &t.Year, &t.StartTime, &t.EndTime, &t.CourseType, &t.BuildingRoom, &t.Campus, &t.CourseName, &t.CourseTitle, &t.Color); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		}
		meetings = append(meetings, t)
	}

	q := make(map[string]map[string]MeetingCalendarArray)

	for _, m := range meetings {
		qq, ok := q[m.Month]
		if !ok {
			qq = make(map[string]MeetingCalendarArray)
			q[m.Month] = qq
		}
		q[m.Month][m.Day] = append(q[m.Month][m.Day], m)
	}

	if err := json.NewEncoder(w).Encode(q); err != nil {
		panic(err)
	}

}

func lang(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	var data LanguageStrings
	switch vars["lng"] {
	case "en-US":
		data = LanguageStrings{
			"Monday",
			"Mon",
			"Tuesday",
			"Tue",
			"Wednesday",
			"Wed",
			"Thursday",
			"Thu",
			"Friday",
			"Fri",
			"Saturday",
			"Sat",
			"Sunday",
			"Sun",
			"January",
			"Jan",
			"February",
			"Feb",
			"March",
			"Mar",
			"April",
			"Apr",
			"May",
			"June",
			"Jun",
			"July",
			"Jul",
			"August",
			"Aug",
			"September",
			"Sep",
			"October",
			"Oct",
			"November",
			"Nov",
			"December",
			"Dec",
			"Week",
			"Schedule",
			"Month",
			"7am",
			"8am",
			"9am",
			"10am",
			"11am",
			"12pm",
			"1pm",
			"2pm",
			"3pm",
			"4pm",
			"5pm",
			"6pm",
			"7pm",
			"8pm",
			"9pm",
			"10pm",
			"11pm",
		}
	case "en":
		data = LanguageStrings{
			"Monday",
			"Mon",
			"Tuesday",
			"Tue",
			"Wednesday",
			"Wed",
			"Thursday",
			"Thu",
			"Friday",
			"Fri",
			"Saturday",
			"Sat",
			"Sunday",
			"Sun",
			"January",
			"Jan",
			"February",
			"Feb",
			"March",
			"Mar",
			"April",
			"Apr",
			"May",
			"June",
			"Jun",
			"July",
			"Jul",
			"August",
			"Aug",
			"September",
			"Sep",
			"October",
			"Oct",
			"November",
			"Nov",
			"December",
			"Dec",
			"Week",
			"Schedule",
			"Month",
			"7am",
			"8am",
			"9am",
			"10am",
			"11am",
			"12pm",
			"1pm",
			"2pm",
			"3pm",
			"4pm",
			"5pm",
			"6pm",
			"7pm",
			"8pm",
			"9pm",
			"10pm",
			"11pm",
		}
	case "fr":
		data = LanguageStrings{
			"lundi",
			"lun",
			"mardi",
			"mar",
			"mercredi",
			"mer",
			"jeudi",
			"jeu",
			"vendredi",
			"ven",
			"samedi",
			"sam",
			"dimanche",
			"dim",
			"janvier",
			"janv",
			"février",
			"févr",
			"mars",
			"mars",
			"avril",
			"avril",
			"mai",
			"juin",
			"juin",
			"juillet",
			"juil",
			"août",
			"août",
			"septembre",
			"sept",
			"octobre",
			"oct",
			"novembre",
			"nov",
			"décembre",
			"déc",
			"Semaine",
			"Planning",
			"Mois",
			"07h00",
			"08h00",
			"09h00",
			"10h00",
			"11h00",
			"12h00",
			"13h00",
			"14h00",
			"15h00",
			"16h00",
			"17h00",
			"18h00",
			"19h00",
			"20h00",
			"21h00",
			"22h00",
			"23h00",
		}

	case "es":
		data = LanguageStrings{
			"lunes",
			"lun",
			"martes",
			"mar",
			"miércoles",
			"mié",
			"jueves",
			"jue",
			"viernes",
			"vie",
			"sábado",
			"sáb",
			"domingo",
			"dom",
			"enero",
			"enero",
			"febrero",
			"feb",
			"marzo",
			"marzo",
			"abril",
			"abr",
			"mayo",
			"junio",
			"jun",
			"julio",
			"jul",
			"agosto",
			"agosto",
			"septiembre",
			"sept",
			"octubre",
			"oct",
			"noviembre",
			"nov",
			"diciembre",
			"dic",
			"Semana",
			"Orden del día",
			"Mes",
			"07:00",
			"08:00",
			"09:00",
			"10:00",
			"11:00",
			"12:00",
			"13:00",
			"14:00",
			"15:00",
			"16:00",
			"17:00",
			"18:00",
			"19:00",
			"20:00",
			"21:00",
			"22:00",
			"23:00",
		}
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err)
	}

}

func init() {
	var c config
	file, err := os.Open("database.json")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&c)
	if err != nil {
		panic(err)
	}

	fmt.Println(c)
	dbURL := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", c.Username, c.Password, c.URL, c.Dbname)

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(termSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(courseSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(meetingSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(instructorSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(gradeSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(meetingCalendarSQL)
	if err != nil {
		panic(err)
	}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/locales/{lng}/{ns}", lang)
	r.HandleFunc("/api/courses", courses)
	r.HandleFunc("/api/terms", terms)
	r.HandleFunc("/api/calendar", calendarMeeting)
	http.Handle("/", r)
	http.ListenAndServe(":8082", nil)
}
