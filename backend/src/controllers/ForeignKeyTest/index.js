const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ForeignKeyTest = require("../../models/ForeignKeyTest");

const foreignKeyTestController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let foreignKeyTest = new ForeignKeyTest({
                      test: req.body.test,
                      testByType: req.body.testByType,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await foreignKeyTest.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(foreignKeyTest)
                }
                return res.send({result: foreignKeyTest})
            }
            catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getList: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                res.send(await baseResults(ForeignKeyTest, 'list', req.query, true, ['test','testByType']))
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getDetail: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const foreignKeyTest  = await ForeignKeyTest.findById(id)
                if(foreignKeyTest){
                    
                          
                            return res.send(await baseResults(ForeignKeyTest, 'id', req.params, false, ['test','testByType']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no ForeignKeyTest with this id"})
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    put: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const foreignKeyTest  = await ForeignKeyTest.findById(id)
                if(foreignKeyTest){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => foreignKeyTest[item] = req.body[item])
                    const updatedForeignKeyTest = await foreignKeyTest.save();
                    if(updatedForeignKeyTest ){
                        return res.send({result: updatedForeignKeyTest })
                    }else{
                       return res.status(500).send({message: 'Error in updating ForeignKeyTest'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no ForeignKeyTest with this id'})
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    delete: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                const foreignKeyTest = await ForeignKeyTest.findById(req.params.id);
                if (foreignKeyTest) {
                      await foreignKeyTest.deleteOne({_id: req.params.id});
                        res.send({ message: "ForeignKeyTest Deleted" });
                } else {
                  res.status(404).send({ message: "ForeignKeyTest Not Found" });
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    }
};

module.exports = foreignKeyTestController;

