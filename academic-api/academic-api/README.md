# Servicios

## Profesor 

| Method   | Path          | Body params                | Returns                 |
|----------|---------------|----------------------------|-------------------------|
| POST     | /profesor     | nomProfesor,apeProfesor,telfProfesor,tituloProfesor | Profesor |
| GET      | /profesor     |                            | Profesor[]              |
| GET      | /profesor/:id |                            | Profesor                |
| PUT      | /profesor/:id | nomProfesor,apeProfesor,telfProfesor,tituloProfesor | Profesor |
| DELETE   | /profesor/:id |                            |                         |

## Estudiante

| Method   | Path           | Body params                | Returns                |
|----------|----------------|----------------------------|------------------------|
| POST     | /estudiante    | nomEstudiante,apeEstudiante,fecNacEstudiante,telfEstudiante | Estudiante |
| GET      | /estudiante    |                            | Estudiante[]           |
| GET      | /estudiante/:id|                            | Estudiante             |
| PUT      | /estudiante/:id| nomEstudiante,apeEstudiante,fecNacEstudiante,telfEstudiante | Estudiante |
| DELETE   | /estudiante/:id|                            |                        |

## Grupo

| Method   | Path          | Body params                | Returns                 |
|----------|---------------|----------------------------|-------------------------|
| POST     | /grupo     | nomGrupo                      | Grupo                   |
| GET      | /grupo     |                               | Grupo[]                 |
| GET      | /grupo/:id |                               | Grupo                   |
| PUT      | /grupo/:id | nomGrupo                      | Grupo                   |
| DELETE   | /grupo/:id |                               |                         |
| POST     | /grupo/:id | idEstudiante                  | Estudiante matriculado en el grupo :id |

## Asignatura

| Method   | Path           | Body params                | Returns                |
|----------|----------------|----------------------------|------------------------|
| POST     | /asignatura    | idProfesor,nomAsignatura   | Asignatura             |
| GET      | /asignatura    |                            | Asignatura[]           |
| GET      | /asignatura/:id|                            | Asignatura             |
| PUT      | /asignatura/:id| idProfesor,nomAsignatura   | Asignatura             |
| DELETE   | /asignatura/:id|                            |                        |

## Actividad

| Method   | Path           | Body params                | Returns                |
|----------|----------------|----------------------------|------------------------|
| POST     | /actividad     | idAsignatura,nomActividad,descripcion | Actividad   |
| GET      | /actividad     |                            | Actividad[]            |
| GET      | /actividad/:id |                            | Actividad              |
| PUT      | /actividad/:id | idAsignatura,nomActividad,descripcion | Actividad   |
| DELETE   | /actividad/:id |                            |                        |

## Calificacion

| Method   | Path           | Body params                | Returns                |
|----------|----------------|----------------------------|------------------------|
| POST     | /calificacion  | idActividad,idEstudiante,calificacion | Calificacion|
| GET      | /calificacion  |                            | Calificacion[]         |
| GET      | /calificacion/:id |                         | Calificacion           |
| PUT      | /calificacion/:id | calificacion            | Calificacion           |
| DELETE   | /calificacion/:id |                         |                        |
