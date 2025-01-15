import { Viaje } from "../modules/Viaje.js"
import { Testimonial } from "../modules/Testimoniales.js"

const paginaInicio = async(req, res) => {
    //Consultar 3 viajes del modelo viaje
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}))
    promiseDB.push(Testimonial.findAll({limit:3}))

    try {
        const result = await Promise.all( promiseDB)
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: result[0],
            testimoniales: result[1]
        })
    } catch (error) {
        console.log(error)
    }


    
}

const paginaNosotros= (req, res)=>{
    res.render('nosotros',{
        pagina: 'Nosotros'
       
    })
}
const paginaViajes = async (req, res)=>{
    const viajes = await Viaje.findAll()

    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes
    })
}

// Mostrar un viaje por su slug
const paginaDetalleViaje = async (req, res)=>{
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: {slug}})

        res.render('infoViaje',{
            pagina: 'Información Viaje',
            viaje
        })

    } catch (error) {
        console.log(error)
    }
}
const paginaTestimoniales = async(req, res)=>{
    try {
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }

   
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}