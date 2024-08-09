const { Router } = require('express');
const WishesController = require('../controllers/wishController'); // Correct import
const wishRouter = Router();

wishRouter.get('/:id', WishesController.getWishesbyid);
wishRouter.get('/', WishesController.getWishes);
wishRouter.post('/', WishesController.createWish);
wishRouter.put('/:id', WishesController.updateWish);
wishRouter.delete('/:id', WishesController.deleteWish);

module.exports = { wishRouter };
