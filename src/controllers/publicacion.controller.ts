import { Request, Response} from "express";
import { getAllJSDocTags } from "typescript";
import publicacion from '../models/publicacion'

function getAllPublicaciones (req:Request, res:Response): void {
    publicacion.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getPublicacion (req:Request, res:Response): void {
    publicacion.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })

}


function newPublicacion (req:Request, res:Response): void {
    const publicacion_1 = new publicacion({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "idBar": req.body.idBar,
        "nameBar": req.body.nameBar,
        "imageBar": req.body.imageBar,
        "texto": req.body.texto,
        "imageUrl": req.body.imageUrl,
        "fecha": req.body.fecha,
        "likes": req.body.likes
    });
    
    publicacion_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function updatePublicacion (req:Request, res:Response): void {
    const id = req.body.id;
    const idBar: String = req.body.idBar;
    const nameBar: String = req.body.nameBar;
    const imageBar: String = req.body.imageBar;
    const texto: String = req.body.texto;
    const imageUrl: String = req.body.imageUrl;
    const fecha: String = req.body.fecha;
    const likes: Number = req.body.likes;
    

    publicacion.update({"id": id}, {$set: {"id": id,"idBar": idBar, "nameBar": nameBar, "imageBar": imageBar, "texto": texto, "imageUrl": imageUrl, "fecha": fecha, "likes": likes}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deletePublicacion(req:Request, res:Response): void {
    const { id } = req.params;
    publicacion.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


export default { getAllPublicaciones, getPublicacion, newPublicacion, updatePublicacion , deletePublicacion };