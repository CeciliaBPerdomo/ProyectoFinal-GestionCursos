# <img src="Angular.png" style="width: 3%"> Primera Entrega Angular <img src="Angular.png" style="width: 3%">
**Creación de un proyecto frontend basado en `Angular` para gestionar los asistentes a una serie de cursos.**

## 🖥️ Descripción General
El objetivo de esta entrega es desarrollar un proyecto frontend utilizando Angular CLI que permita la gestión de asistentes a diversos cursos. 

- El sistema debe contar con funcionalidades diferenciadas según el tipo de usuario: 
    - Administrador y Usuario. 
    - Cada uno tendrá acceso a diferentes secciones y funcionalidades específicas.

## 🔌​ Requisitos Generales
- Creación de un proyecto Angular CLI.
- Creación de componentes de layout, incluyendo un navbar para el menú lateral y un toolbar para el título de la aplicación.
- Componentes de la aplicación:
    - Lista de Alumnos: Visualización de los alumnos inscritos en los cursos.
    - ABM de Alumnos: Alta, Baja y Modificación de alumnos.
- Uso de Formularios Reactivos para la creación y modificación de alumnos.
- Estructuración de datos y lógica:
    - Implementar la representación de los datos en listas.
    - Tablas dinámicas con Angular Material, que tomen los datos desde arrays y funciones de TypeScript.

## ​👥​ Roles de usuario
- **Perfil Administrador**: El usuario con rol de administrador podrá realizar las siguientes acciones:
    - **Listar**: Consultar los listados de alumnos, cursos e inscripciones.
    - **Alta y baja**: Crear nuevos registros y eliminar alumnos, cursos e inscripciones.
    - **Modificación**: Modificar los datos de los alumnos, los cursos y las inscripciones.
    - **Gestión de usuarios**: Crear y modificar usuarios.
- **Perfil Usuario**: El usuario con rol de usuario tendrá las siguientes funcionalidades:
    - **Listar**: Consultar los listados de alumnos y cursos.
    - **Gestión de inscripciones**: Agregar o eliminar inscripciones de alumnos en los cursos.
    - **Restricciones**: No podrá modificar la información de los alumnos, los cursos ni los usuarios.

## ​💻​ Proyecto
Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Home page
![Home page](image-2.png)


- Menú **Alumno**
    - Perfil
    - Cursos
- Menú **Administrador**
    - Alumnnos
    - Cursos
    - Inscripciones

## ​​💣​ Servidor de desarrollo
Para iniciar un servidor de desarrollo local, ejecutá:

```bash
ng s
```

<p>Una vez que el servidor esté en funcionamiento, abrí tu navegador y navegá a <strong>http://localhost:4200/</strong>.</p>
La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.


## 🎨 Angular Material
```bash
ng add @angular/material
```
**Documentación oficial**: https://material.angular.dev/guide/getting-started

## ​​📑​ Recursos adicionales
Para obtener más información sobre cómo usar Angular CLI, incluyendo una referencia detallada de los comandos, visitá la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## 👩‍💻 Desarrollo
<p>Hecho con 💻, 🧉 y un toque de magia por <a href="https://www.linkedin.com/in/cecilia-perdomo/" style="color: black; text-decoration: none;">Cecilia Perdomo</a>.</p>
🗓️ Proyecto iniciado el <strong>16 de julio de 2025</strong>.

![Angular](image.png)