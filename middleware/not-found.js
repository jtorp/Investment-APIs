const notFound = (req,res) =>{
   res.status(404).send('<h1 style="color: red; margin-top: 5%;">Sorry -  page not Found</h1>')
}
module.exports = notFound