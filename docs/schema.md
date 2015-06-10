# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## papers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
author_id       | integer   | not null, foreign key
body            | text      | not null
field           | string    | not null
institution     | string    | 

## authors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## author_papers
(join table)

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
paper_id        | integer   | not null, foreign key
author_id       | integer   | not null, foreign key

## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (author of annotation)
paper_id    | integer   | not null, foreign key
body        | text      | not null
excerpt     | text      | not null (the exact line being annotated)
up_votes    | integer   |
down_votes  | integer   |

## comments
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
author_id     | integer   | not null, foreign key (author of comment)
annotation_id | integer   | not null, foreign key
body          | text      | not null