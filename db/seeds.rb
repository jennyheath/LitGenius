# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user1 = User.create!({username: "Richard Hakim", password: "password"})

journal1 = Journal.create!({name: "Nature"})
journal2 = Journal.create!({name: "Journal of Physiology"})
journal3 = Journal.create!({name: "Internaitonal Journal of Molecular Sciences"})
journal4 = Journal.create!({name: "Journal of Organic Chemistry"})

field1 = Field.create!({name: "Biochemistry"})
field2 = Field.create!({name: "Bioengineering"})
field3 = Field.create!({name: "Bioinformatics"})
field4 = Field.create!({name: "Biophysics"})
field5 = Field.create!({name: "Cell Biology"})
field6 = Field.create!({name: "Epidemiology"})
field7 = Field.create!({name: "Genetics"})
field8 = Field.create!({name: "Molecular Biology"})
field9 = Field.create!({name: "Neurobiology"})
field10 = Field.create!({name: "Chemistry"})
field11 = Field.create!({name: "Chemical Engineering"})
field12 = Field.create!({name: "Inorganic Chemistry"})
field13 = Field.create!({name: "Organic Chemistry"})
field14 = Field.create!({name: "Physical Chemistry"})
field15 = Field.create!({name: "Geophysics"})
field16 = Field.create!({name: "Physics"})

institution1 = Institution.create!({name: "University of California Berkeley"})
institution2 = Institution.create!({name: "University of Cambridge"})
institution3 = Institution.create!({name: "University of Campinas"})
institution4 = Institution.create!({name: "Cold Spring Harbor Laboratory"})
institution5 = Institution.create!({name: "Cornell University"})

author1 = Author.create!({name: "Adesnik, H."})
author2 = Author.create!({name: "Bruns, W."})
author3 = Author.create!({name: "Cerqueira-Silva, C.B.M."})
author4 = Author.create!({name: "Corrêa, R.X."})
author5 = Author.create!({name: "Hodgkin, A.L."})
author6 = Author.create!({name: "Huang, J."})
author7 = Author.create!({name: "Huxley, A.F."})
author8 = Author.create!({name: "Jesus, O.N"})
author9 = Author.create!({name: "Santos, E.S.L."})
author10 = Author.create!({name: "Scanziani, M."})
author11 = Author.create!({name: "Souza, A.P."})
author12 = Author.create!({name: "Taniguchi, H."})
author13 = Author.create!({name: "Wehr, M."})
author14 = Author.create!({name: "Zador, A.M."})
author15 = Author.create!({name: "Hoepker, A.C."})
author16 = Author.create!({name: "Collum, D.B"})
# author = Author.create!({name: ""})
# author = Author.create!({name: ""})

paper1 = Paper.create!({title: "Balanced inhibition underlies tuning and sharpens spike timing in auditory cortex.",
                        body: File.read(../assets/papers/Neurobiology1.rtf),
                        user_id: 1,
                        journal_id: 1,
                        field_id: 9,
                        institution_id: 4})
paper1.authors = [author13, author14]
paper2 = Paper.create!({title: "Currents carried by sodium and potassium ions through the membrane of the giant axon of Loligo",
                        body: File.read(../assets/papers/Neurobiology2.rtf),
                        user_id: 1,
                        journal_id: 2,
                        field_id: 9,
                        institution_id: 2})
paper2.authors = [author5, author7]
paper3 = Paper.create!({title: "A Neural Circuit for Spatial Summation in Visual Cortex",
                        body: File.read(../assets/papers/Neurobiology3.rtf),
                        user_id: 1,
                        journal_id: 1,
                        field_id: 9,
                        institution_id: 1})
paper3.authors = [author1, author2, author12, author6, author10]
paper4 = Paper.create!({title: "Genetic Breeding and Diversity of the Genus Passiflora",
                        body: File.read(../assets/papers/Neurobiology3.rtf),
                        user_id: 1,
                        journal_id: 3,
                        field_id: 7,
                        institution_id: 3})
paper4 = Paper.create!({title: "Computational Studies of Lithium Diisopropylamide Deaggregation",
                        body: File.read(../assets/papers/Neurobiology3.rtf),
                        user_id: 1,
                        journal_id: 4,
                        field_id: 13,
                        institution_id: 5})
