## Acerca de

**Egraficos** es una aplicación web para crear graficos y mapas personalizados usando las librerías [echarts]() y [leaflet]() respectivamente.

A parte de poder descargar los gráficos en formatos svg o png, también permite crear widgets que pueden ser incrustados en caulquier servicio web.

Conociendo la necesidad de trabajar con información sencible, los datos inyectados en Egraficos es procesada únicamente en el navegador: **no existen operaciones ni almacenamiento de información en el lado del servidor**. Es decir, nadie puede ver, tocar o copiar los datos.

## Uso

La forma más sencilla de probar la aplicación es accediendo a la url de [desarrollo](https://estadisticas.arte-consultores.com/egraficos). Aunque si se desea ejecutar localmente puede seguir las instrucciones descritas a continuación en el apartado de instalación.

## Instalación

### Requerimientos

Es necesario tener **maven** instalado, el resto de componentes, npm y node se instalarán automáticamente.

### Instrucciones de instalación

El siguiente script descargará todos los módulos necesarios para la compilación del proyecto y a continuación generará en la carpeta build el ejecutable:

```shell
mvn clean install
```

Una vez con todos los módulos descargados podremos ejecutar en local con el siguiente script:

```shell
npm start
```

Si queremos generar el build para producción manualmente:

```shell
npm run build:all
```

Si regenerar el widget:

```shell
npm run build:widget
```

Si queremos regenerar el build para producción sin regenerar el widget:

```shell
npm run build
```

### Modificaciones a tener en cuenta en función del entorno

En función del entorno en el que despleguemos la aplicación existen una serie de variables que pueden modificiarse y son aquellas que se incluyen en el fichero public/application.json

Para que el widget funcione correctamente necesitamos definir la propiedad Access-Control-Allow-Origin en la respuesta a las peticiones que se hagan a la aplicación.

#### Ejemplo en un apache genérico

Incluir la siguiente línea en la difinición del directorio dónde se encuentra la aplicación:

```
<Directory /.../egraficos>
   ...
   Header set Access-Control-Allow-Origin "*"
   ...
</Directory>
```

#### Ejemplo para el apache de estadisticas.arte-consultores.com

Incluir en el fichero de configuración estadisticas.arte-consultores.com.conf la siguiente regla:

```
###########################################################
# egraficos
###########################################################

RewriteRule ^/egraficos(.*) - [ENV=SET_ACCESS_CONTROL_ALLOW_ORIGIN]
```