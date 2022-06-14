const notFound = (req,res) =>{
   res.status(404).send('<iframe style="display:flex; filter: saturate(2); margin: auto;"src = "https://giphy.com/embed/C21GGDOpKT6Z4VuXyn" width = "150" height = "210" frameBorder = "0"></iframe > ')
}
module.exports = notFound