CREATE TABLE users(
    id                              TEXT NOT NULL PRIMARY KEY UNIQUE,
    email                           VARCHAR(320) NOT NULL UNIQUE,
    password                        TEXT NOT NULL,
    name                            VARCHAR(200),
    created_at                      TIMESTAMP NOT NULL,
);

CREATE TABLE marks(
    id                              BIGSERIAL PRIMARY KEY,
    mark                            NUMERIC(4, 2),
    weighting                       INT,
    exam_weighting                  INT,
    type                            TEXT,
    year                            INT,
    period                          INT,
    description                     TEXT,
    subject                         TEXT,
    subject_abbreviation            VARCHAR(10),
    input_date                      TIMESTAMP,
    is_examendossier_resultaat      BOOLEAN,
    is_voortgangsdossier_resultaat  BOOLEAN,
    origin                          VARCHAR(20),
    user_id                         TEXT REFERENCES users(id)
);
