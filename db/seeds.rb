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
journal5 = Journal.create!({name: "Journal of Graph Theory"})
journal6 = Journal.create!({name: "Journal of Commutative Calculus"})
journal7 = Journal.create!({name: "Honduran Journal of Concrete Graph Theory"})
journal8 = Journal.create!({name: "The Astrophysical Journal"})
journal9 = Journal.create!({name: "General Relativity and Quantum Cosmology"})
journal10 = Journal.create!({name: "JSM Chemistry"})

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
field17 = Field.create!({name: "Topology"})
field18 = Field.create!({name: "Abstract Algebra"})
field19 = Field.create!({name: "Geometry"})
field20 = Field.create!({name: "Number Theory"})
field21 = Field.create!({name: "Physiology"})
field22 = Field.create!({name: "Astrophysics"})

institution1 = Institution.create!({name: "University of California Berkeley"})
institution2 = Institution.create!({name: "University of Cambridge"})
institution3 = Institution.create!({name: "University of Campinas"})
institution4 = Institution.create!({name: "Cold Spring Harbor Laboratory"})
institution5 = Institution.create!({name: "Cornell University"})
institution6 = Institution.create!({name: "Mathgen Institute"})
institution7 = Institution.create!({name: "Lawrence Berkeley National Laboratory"})
institution8 = Institution.create!({name: "University of Bucharest"})

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
author17 = Author.create!({name: "Raman, Y."})
author18 = Author.create!({name: "Sasaki, R."})
author19 = Author.create!({name: "Watanabe, D."})
author20 = Author.create!({name: "Bose, O."})
author21 = Author.create!({name: "Miller, O."})
author22 = Author.create!({name: "Li, Z."})
author23 = Author.create!({name: "Thomas, T."})
author24 = Author.create!({name: "Perlmutter, S."})
author25 = Author.create!({name: "Aldering, G."})
author26 = Author.create!({name: "Goldhaber, G."})
author27 = Author.create!({name: "Speliotopoulos, A.D."})
author28 = Author.create!({name: "Gestal, C."})
author29 = Author.create!({name: "Holban, A.M."})

paper1 = Paper.create!({title: "Balanced inhibition underlies tuning and sharpens spike timing in auditory cortex.",
                        body: File.read("./app/assets/papers/Neurobiology1.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 1,
                        field_id: 9,
                        institution_id: 4})
paper1.authors = [author13, author14]

paper2 = Paper.create!({title: "Currents carried by sodium and potassium ions through the membrane of the giant axon of Loligo",
                        body: File.read("./app/assets/papers/Neurobiology2.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 2,
                        field_id: 9,
                        institution_id: 2})
paper2.authors = [author5, author7]

paper3 = Paper.create!({title: "A Neural Circuit for Spatial Summation in Visual Cortex",
                        body: File.read("./app/assets/papers/Neurobiology3.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 1,
                        field_id: 9,
                        institution_id: 1})
paper3.authors = [author1, author2, author12, author6, author10]

paper4 = Paper.create!({title: "Genetic Breeding and Diversity of the Genus Passiflora",
                        body: File.read("./app/assets/papers/Genetics1.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 3,
                        field_id: 7,
                        institution_id: 3})
paper4.authors = [author3, author8, author9, author4, author11]

paper5 = Paper.create!({title: "Computational Studies of Lithium Diisopropylamide Deaggregation",
                        body: File.read("./app/assets/papers/OrganicChemistry1.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 4,
                        field_id: 13,
                        institution_id: 5})
paper5.authors = [author15, author6]

paper6 = Paper.create!({title: "Prime, Banach, Fr´echet–Von Neumann Groups of Subsets and Problems in Descriptive Graph Theory",
                        body: File.read("./app/assets/papers/Math1.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 5,
                        field_id: 20,
                        institution_id: 6})
paper6.authors = [author17, author18, author19, author20]

paper7 = Paper.create!({title: "Isometries and Kovalevskaya’s Conjecture",
                        body: File.read("./app/assets/papers/Math2.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 6,
                        field_id: 19,
                        institution_id: 6})
paper7.authors = [author22, author21, author20, author19]

paper8 = Paper.create!({title: "B-Integral Homomorphisms over Maclaurin, Right-Geometric, Pappus Matrices",
                        body: File.read("./app/assets/papers/Math3.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 7,
                        field_id: 17,
                        institution_id: 6})
paper8.authors = [author17, author22, author18]

paper9 = Paper.create!({title: "Homomorphisms and Minimality Methods",
                        body: File.read("./app/assets/papers/Math4.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 5,
                        field_id: 20,
                        institution_id: 6})
paper9.authors = [author23, author21, author19, author17]

paper10 = Paper.create!({title: "Measurements of Ω and Λ from 42 high-redshift supernovae",
                        body: File.read("./app/assets/papers/Physics.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 8,
                        field_id: 22,
                        institution_id: 7})
paper10.authors = [author24, author25, author26]

paper11 = Paper.create!({title: "Dark Energy and Extending the Geodesic Equations of Motion: Its Construction and Experimental Constraints",
                        body: File.read("./app/assets/papers/Physics2.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 9,
                        field_id: 16,
                        institution_id: 1})
paper11.authors = [author27]

paper12 = Paper.create!({title: "Advances in Nanotechnology as an Alternative against Superbugs",
                        body: File.read("./app/assets/papers/Chemistry2.txt").encode("UTF-8", invalid: :replace, undef: :replace, replace: "-"),
                        user_id: 1,
                        journal_id: 10,
                        field_id: 12,
                        institution_id: 8})
paper12.authors = [author28, author29]
