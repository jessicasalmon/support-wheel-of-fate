BEGIN;

DROP TABLE IF EXISTS engineers CASCADE;

CREATE TABLE engineers (
  id                    SERIAL,
name                    VARCHAR     PRIMARY KEY     UNIQUE,
  shifts_worked         INTEGER
);

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
