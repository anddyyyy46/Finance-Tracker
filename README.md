webapp:
npm run dev

backend:
docker compose up -d
mvn spring-boot:run

connect to db (sonst pgadmin schon eingerichtet):
docker exec -it postgres_db psql -U admin -d mydb

| `mvn flyway:migrate` | Führt alle noch nicht ausgeführten Migrationen aus. |

| `mvn flyway:clean` | Löscht alle Tabellen der Datenbank (Vorsicht! Daten gehen verloren). |

| `mvn flyway:info` | Zeigt den Status aller Migrationen (bereits ausgeführt / pending). |

| `mvn flyway:validate` | Prüft, ob die Migrationen konsistent mit der DB sind. |

| `mvn flyway:baseline` | Setzt einen Baseline-Punkt in einer bereits existierenden DB. |

| `mvn flyway:repair` | Repariert die Flyway-Metadaten, z.B. korrigiert fehlgeschlagene Migrationen. |
