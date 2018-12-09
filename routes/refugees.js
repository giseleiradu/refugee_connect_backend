import express from 'express';
import authentication from '../helper/authentication'
import Refugee from '../controllers/refugees';

const router = express.Router();

// router.post('/', authentication(), Parcel.createParcel);
router.post('/', authentication(), Refugee.getAll);
router.get('/', authentication('admin'), Refugee.getAll);
router.get('/:id/:parcelId', authentication('user'), Refugee.getById);
// router.put('/:parcelId/destination', Parcel.updatePropertyById);

// router.put('/:id/:parcelId/destinaton', authentication('user'), Parcel.updateDestination);
// router.put('/:parcelId/status', authentication('user'), Refugee.updatePropertyById);
// router.put('/:parcelId/currentLocation',authentication('admin'),  Refugee.updatePropertyById);
export default router;

