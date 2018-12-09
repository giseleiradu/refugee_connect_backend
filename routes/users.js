import express from 'express';
import User from '../controllers/users';
import authentication from '../helper/authentication';

const router = express.Router();


// router.get('/:id/donors', User.getAll);
router.get('/', User.getAll);
// router.get('/:userId', authentication('admin'), User.getById);
// router.get('/:userId', authentication('donor'), User.getById);

// router.post('/', authentication(), Parcel.createParcel);
// router.get('/:id/refugees', authentication('user'), User.getUserParcels);
// router.get('/', authentication('admin'), User.getAll);
// router.put('/:parcelId/destination', Parcel.updatePropertyById);
// router.put('/:id/:parcelId/destinaton', authentication('user'), Parcel.updateDestination);
// router.put('/:parcelId/status', authentication('user'), Refugee.updatePropertyById);
// router.put('/:parcelId/currentLocation',authentication('admin'),  Refugee.updatePropertyById);
export default router;