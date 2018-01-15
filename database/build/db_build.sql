BEGIN;

DROP TABLE IF EXISTS engineers CASCADE;
DROP TABLE IF EXISTS shifts CASCADE;

CREATE TABLE engineers (
  id                    SERIAL,
name                    VARCHAR     PRIMARY KEY     UNIQUE,
  shifts_worked         INTEGER
);

CREATE TABLE shifts (
  id                 SERIAL,
  shift_today        VARCHAR[],
  shift_yesterday    VARCHAR[]
);

INSERT INTO shifts
  (shift_today, shift_yesterday)
VALUES
('{"name1", "name2"}',
'{"name3", "name4"}');


INSERT INTO engineers
  (name, shifts_worked)
VALUES
  ('Malinda Mannion', 0),
  ('Bud Bjork', 0),
  ('Jarrett Jett', 0),
  ('Cassaundra Couts', 0),
  ('Ashli Applebee', 0),
  ('Myrtice Manfre', 0),
  ('Eugenie Etherton', 0),
  ('Madge Mcginty', 0),
  ('Assunta Austin', 0),
  ('Madlyn Moncada', 0);

COMMIT;
