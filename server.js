import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Products from "./Products.js";

dotenv.config();

const app = express();
const PORT = 9800;

app.use(express.json());

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado com o MONGODB");

  } catch (error) {

    console.log("Erro ao conectar com o MongoDB", error);

  }
};

connectDB();

app.post("/products",async (req, res) => {

    try {

        const novoProduto = await Products.create(req.body);
        res.json(novoProduto);

    } catch (error) {

        res.json({ error: error.message });
            
    }
});

app.get("/products",async (req, res) => {

  try {

    const produtos = await Products.find();
    res.json(produtos);

  } catch (error) {

    res.json ( {error: error.message} );

  }
});

app.get( "/products/:id", async (req,res) => {
  try {

    const produtoEncontrado = await Products.findById (req.params.id)
    res.json(produtoEncontrado  );

  } catch (error) {

    res.json ( {error: error.message} );

  }
});

app.delete( "/products/:id/delete", async (req,res) => {
  try {

    const produtoDeletado = await Products.findByIdAndDelete (req.params.id)
    res.json(produtoDeletado);

  } catch (error) {

    res.json ( {error: error.message} );

  }
});

app.put("/products/:id/update", async (req,res) => {

  try {

    const produtoAtualizado = await Products.findByIdAndUpdate(

      req.params.id,
      req.body

    )

    res.json(produtoAtualizado)

  } catch (error) {

    res.json( { error: error.message } )

  }

})

app.get("/products/available", async (req,res) => {

    try {
        
    const produtos = await Products.find( {

        disponivel: true

    } )

    res.json(produtos)

    } catch (error) {

    res.json( { error: error.message } )

    }
})

app.get("/products/category/:categoria", async (req,res) => {

    try {

        const produtos = await Products.find ( {

            categoria: req.params.categoria

        })

        res.json(produtos)

    } catch (error) {

        res.json( { error: error.message } )
 
    }
})

app.get( "/products/price/:valor", async (req, res) => {

    try {

        const valor = Number(req.params.valor )

        if(valor < 0) {
          res.json({ error : "Preço inválido"})
        }

        const produtos = await Products.find({

          preco: { $lt: valor}

        })

        res.json(produtos)

    } catch ( error ) {

        res.json( { error: error.message } )
    }

})

app.get("/products/low-stock", async (req,res) => {

  try {

    const produtos = await Products.find({

      quantidade: {$lt : 5}

    })

          res.json(produtos)

  } catch ( error ) {

          res.json( { error: error.message } )

  };

})

app.patch("/products/:id/availability", async(req , res) => {

  try {

  const produtos = await Products.findByIdAndUpdate( 

    req.params.id,
    { disponivel: req.body.disponivel },
    { new: true }

  )

    res.json(produtos)

  } catch ( error ) {

    res.json( { error: error.message } )

  }
})
app.listen(PORT, () =>

  console.log("O servidor está rodando na porta : ", PORT),

);
