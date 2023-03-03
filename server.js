import express, { urlencoded } from 'express'
import { connect } from 'mongoose'
import { find } from './myarticle/article'
import articleRouter from './rout/articles'
import methodOverride from 'method-override'
const app = express()

connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  
  const articles = await find().sort({ createdAt: 'desc' })  
  res.render('articles/index', { articles: articles })

})


app.use('/articles', articleRouter)

