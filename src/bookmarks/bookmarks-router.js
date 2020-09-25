const express = require('express')
const { v4: uuid } = require('uuid')
const { isWebUri } = require('valid-url')
const logger = require('../logger')
const { bookmarks } = require('../store')
const BookmarksService = require('./bookmarks-service')
const bookmarksRouter = express.Router()
const jsonParser = express.json()
const xss = require('xss')

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    title: xss(bookmark.title),
    url: bookmark.url,
    description: xss(bookmark.description),
    rating: bookmark.rating
})

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BookmarksService.getAllBookmarks(knexInstance)
        .then(bookmarks => {
            res.json(bookmarks.map(serializeBookmark))
        })
        .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, url, description, rating } = req.body
    const newBookmark = { title, url, description, rating }

// })
           // for (const [key, value] of Object.entries(newBookmark))
    //     if (value == null) {
    //         logger.error(`${key} is required`)
    //         return res.status(400).json({
    //             error: { message: `${key} is required`}
    //          }

    for (const field of ['title', 'url', 'rating']) {
        if (!req.body[field]) {
            logger.error(`${field} is required`)
            return res.status(400).send({
            error: { message: `'${field}' is required` }
            })
        }
        }

    

    // if (!title) {
    //     logger.error('Title is required');
    //     return res
    //         .status(400)
    //         .send('Invalid data');
    // }

    // if (!url) {
    //     logger.error('URL is required');
    //     return res
    //         .status(400)
    //         .send('Invalid data');
    // }

    // if (!rating) {
    //     logger.error('Rating is required');
    //     return res
    //         .status(400)
    //         .send('Invalid data');
    // }

    // for (const field of ['title', 'url', 'rating']) {
    //     if (!req.body[field]) {
    //       logger.error(`${field} is required`)
    //       return res.status(400).send(`'${field}' is required`)
    //     }
    //   }

    const ratingNum = Number(rating)

    if(!Number.isInteger(ratingNum) || ratingNum < 0 || ratingNum > 5) {
        logger.error(`Invalid rating '${rating}' supplied`)
        return res
            .status(400)
            .json({ error: { message: `'rating' must be a number between 0 and 5` }})
    }

    if (!isWebUri(url)) {
        logger.error(`Invalid url '${url}' supplied`)
        return res
            .status(400)
            .json({ error: { message: `'url' must be a valid URL` }})
    }
    
    BookmarksService.insertBookmark(
        req.app.get('db'),
        newBookmark
    )
        .then(bookmark => {
            logger.info(`Bookmark with id ${bookmark.id} created.`);
            res
                .status(201)
                .location(`/bookmarks/${bookmark.id}`)
                .json(serializeBookmark(bookmark));
        })
        .catch(next)
  })

bookmarksRouter
  .route('/bookmarks/:id')
  .all((req, res, next) => {
    const { id } = req.params
    BookmarksService.getById(req.app.get('db'), id)
        .then(bookmark => {
            if (!bookmark) {
                logger.error(`Bookmark with id ${id} not found.`)
                return res.status(404).json({
                    error: { message: `Bookmark not found` }
                })
            }
            res.bookmark = bookmark
            next()
        })
        .catch(next)
  })
  .get((req, res) => {
    res.json(serializeBookmark(res.bookmark))
  })
  .delete((req, res, next) => {
    const { id } = req.params;

    BookmarksService.deleteBookmark(
        req.app.get('db'),
        id
    )
        .then(numRowsAffected => {
            logger.error(`Bookmark with id ${id} not found.`);
            res.status(204).end()
        })
        .catch(next)
  })

module.exports = bookmarksRouter