let list = `Intern,

Manager,

Product Selector,

Manager,

Consultant,

Analyst,

Analyst,

Intern,

Intern,

Associate,

Intern,

Consultant,

Analyst,

Analyst,

Member,

Member,

Member,

Consultant,

Intern,

member,

Consultant,

Trainee,

Intern,

Trainee,

Software Engineer,

Intern,

Consultant,

Consultant,

Intern,

Intern,

Professor,

Head,

Faculty,

Professor,

Lecturer,

Manager 

Manager,

Intern,

Manager,

Intern,

Executive,

Assistant,

Supervisor,

Manager,

MBA,

Intern,

Project,

Manager,

Trainee,

Intern,

Intern,

Intern,

Member,

Member,

Member,

Expert,

Associate,

Manager,

Associate,

Executive,

Associate,

Software Engineer,

Leader,

Software Engineer,

Developer,

Intern,

Leader,

Consultant,

Associate,

Intern,

Intern,

Intern,

Intern,

ME Biotechnology,

Intern,

Intern,

Alumna,

Intern,

Intern,

Intern,

Intern,

Intern,

Intern,

Intern,

Faculty,

Faculty,

Member,

Faculty,

Faculty,

Manager,

Engineer,

Engineer,

Engineer,

Head,

Intern,

Intern,

Professor,

Faculty,

Manager,

Associate,

Design Engineer,

Design Engineer,

Intern,

Manager,

Manager,

Engineer,

Project Engineer, 

Project Engineer,

Design Engineer,

Banker,

Banker,

Banker,

Banker,

Banker,

Intern,

Intern,

Intern,

Manager,

Member,

Member,

Student,

Intern,

Product Specialist,

Consultant,

Mentor,

Manager,

Consultant,

Leader,

Analyst,

Analyst,

Executive,

Associate,

Coordinator,

Secretary,

Ss****,

Dr,

Trainee,

Consultant,

Manager,

Manager,

Trainee,

Intern,

Intern ,

Control Engineer,

Intern,

Intern,

Analyst,

Associate,

Coordinator,

Intern,

Intern,

Intern,

Leader,

Club,

Intern,

Member,

Intern,

Intern,

Professor,

Research Scholar,

Manager,

Analyst,

Intern,

Author,

Writer,

Ph.D.,

Research Scholar,

Research Scholar,

Member,

Member,

member,

Member,

Member,

Member,

Member,

Member,

Teaching Assistant,

PHD Scholar,

PHD Scholar,

Leader,

Consultant,

Consultant,

Manager,

Vice President,

Deep Learning Engineer,

Intern,

Intern,

Engineer,

Research Fellow,

Director,

Director,

Manager,

Leader,

developer,

Volunteer,

Volunteer,

Intern,

Volunteer,

Member,

Associate,

Intern,

Director,

Leader,

Intern,

Researcher,

Intern,

Marketing,

Business,

Project ,

Head ,

Vice President,

Analyst,

Project,

Intern,

Intern,

Developer,

Developer,

Machine Learning Engineer,

Volunteer,

Manager,

Marketing,

Consultant,

Chief Executive Officer,

Director,

Director,

Owner,

CEO,

Director,

Manager,

Intern,

Head,

Intern,

associate,

Student,

Intern,

Manager,

Manager,

Head,

Analyst,

Researcher,

Associate,

Associate,

Manager,

Marketer,

Treasurer,

Intern,

Vice President,

Associate,

Associate,

Associate,

Analyst,

Analyst,

Analyst,

Analyst,

Consultant,

Associate,

Trainee,

Student,

Analyst,

Analyst,

Intern,

Application Engineer,

Intern,

Manager,

Manager,

Operations Specialist,

Intern,

Intern,

Consultant,

Founder,

Professional,

Consultant,

Trainee,

Intern,

Teaching Assistant,

student,

Analyst,

Research,

ENO****,

Member,

Intern,

Intern,

Intern,

Coordinator,

Teaching Assistant,

Teaching Assistant,

Intern,

Analyst,

Analyst,

Intern,

Software Engineer,

Designer,

Intern,

Director,

Consultant,

Entrepreneur,

Developer,

Developer,

Intern,

President,

Coordinator,

Captain,

Manager,

Intern,

Manager,

Chairman,

Developer,

Leader,

Developer,

Intern,

Intern,

Analyst,

Head,

Intern,

Consultant,

Member,

Trainee,

Professor,

Coordinator,

Trainee,

Intern,

Volunteer,

Teacher,

Manufacturing,

Consultant,

Manager,

Manager,

member,

Intern,

Member,

Manager,

Products,

Co-Founder,

Manager,

Strategy,

Intern,

Intern,

Intern,

Member,

Member,

Member,

Member,

Member,

Member,

Leader,

Leader,

Member,

Director,

Partner,

Manager,

Associate,

Associate,

Data Scientist,

Consultant,

Director,

Professor,

Chairman,

Director,

CEO,

Professor,

Co-Founder,

Co-Founder,

Vice President ,

Chief Product Officer,

Director,

Manager,

Manager,

Manager,

Executive,

Intern,

Intern,

Tutor,

Trainee,

Member,

Member,

Member,

Marketing,

Member,

Student,

Consultant,

Manager,

Consultant,

Agile Coach,,

Agile Coach,

Consultant,

Agile Coach,

Agile Coach,

Consultant,

Agile Coach,

Consultant,

Student,

Coordinator,

Developer,

Co-Founder,

Intern,

Manager,

Developer,

Member,

Member,

Member,

Leader,

Member,

Research,

Professor,

Professor,

Professor,

Lecturer,

Member,

Coordinator,

Member,

Associate,

Manager,

Associate,

Analyst,

Intern,

Intern,

Writer,

member,

Student,

Professor,

Engineer,

Leader,

Member,

Intern,

Intern,

Intern,

Intern,

Operations,

Operations,

member,

Teaching Assistant,

Research Scholar,

Project,

Student,

Coordinator,

Intern,

Manager,

Leader,

Intern,

Designer,

Analyst,

Consultant,

Teaching Assistant,

Member,

Member,

Member,

Intern,

Intern,

Analyst,

Co-Founder,

Developer,

Secretary,

Head,

Representative,

Co-Founder,

Consultant,

Representative,

Consultant,

Finalist,

Finalist,

Intern,

Consultant,

Consultant,

Intern,

President,

Intern,

Coordinator,

Intern,

Analyst,

Sales,

Manager,

Intern,

Vice President,

Intern,

Chief Marketing Officer,

Intern,

teacher,

Consultant,

Analyst,`;

list = list.split('\n').join('');
list = list.split(',');
let newList=[];
list.map(item => {
    newList.push("'" + item.toLowerCase().split(' ').join('_') + "'")
})
console.log(newList.join(','));