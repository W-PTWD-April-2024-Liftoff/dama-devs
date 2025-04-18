package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Photo;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.PhotoRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private GardenRepository gardenRepository;
    @Autowired
    private UserRepository userRepository;

    public PhotoService(PhotoRepository photoRepository, GardenRepository gardenRepository, UserRepository userRepository) {
        this.photoRepository = photoRepository;
        this.gardenRepository = gardenRepository;
        this.userRepository = userRepository;
    }


//******************  this will only allow the gardens that do not have a photo in the drop down menu
//**** fetched on photo-upload

    public List<Garden> getGardensWithoutPhotosByUserId(Integer userId) {
        List<Garden> allUserGardens = gardenRepository.findByUser_UserId(userId);
        List<Photo> userPhotos = photoRepository.findPhotosByUser_UserId(userId);

        List<Integer> gardenIdsWithPhotos = userPhotos.stream()
                .map(photo -> photo.getGarden().getId())
                .distinct()
                .toList();

        return allUserGardens.stream()
                .filter(garden -> !gardenIdsWithPhotos.contains(garden.getId()))
                .toList();
    }
//*********  saves the photo to garden by the authenticated user, updates the photoRepository with all the id's

    public Photo savePhoto(MultipartFile file, String photoName, Integer gardenId, Integer userId) throws IOException {
        Garden garden = gardenRepository.findById(gardenId)
                .orElseThrow(() -> new RuntimeException("Garden not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Photo photo = new Photo();
        photo.setPhotoName(photoName);
        photo.setPhotoImage(file.getBytes());
        photo.setGarden(garden);
        photo.setUser(user);

        return photoRepository.save(photo);
    }


    //**** fetched in Photo-Fetching
    //******* Gets the photos by user to display in the dashboard

    public List<Photo> findPhotosByUser_UserId(Integer userId) {
        return photoRepository.findPhotosByUser_UserId(userId);
    }
    //*******************  to set a featured photo in the dashboard

    public void setFeaturedPhoto(Integer photoId, Integer userId) {
        Optional<Photo> optionalPhoto = photoRepository.findById(photoId);

        if (optionalPhoto.isEmpty()) {
            throw new IllegalArgumentException("Photo not found.");
        }

        Photo photo = optionalPhoto.get();

        // Check if the photo belongs to the current user
        if (!photo.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to modify this photo.");
        }

        // First, remove any existing featured photos for this user
        List<Photo> userPhotos = photoRepository.findPhotosByUser_UserId(userId);
        for (Photo p : userPhotos) {
            if (p.isFeatured()) {
                p.setFeatured(false);
                photoRepository.save(p);
            }
        }

        // Set new featured photo
        photo.setFeatured(true);
        photoRepository.save(photo);
    }


//****Keeping logic in case we change how or where we are updating/deleting photos in garden details page

    //********** UPDATE PHOTO
    public Photo updatePhoto(Integer photoId, MultipartFile file, String photoName, Integer userId) throws IOException {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found"));

        if (!photo.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to update this photo.");
        }

        if (photoName != null && !photoName.trim().isEmpty()) {
            photo.setPhotoName(photoName);
        }

        if (file != null && !file.isEmpty()) {
            photo.setPhotoImage(file.getBytes());
        }

        return photoRepository.save(photo);
    }

    //****************** DELETE PHOTO
    public void deletePhoto(Integer photoId, Integer userId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found"));

        if (!photo.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this photo.");
        }

        photoRepository.delete(photo);
    }

    public List<Photo> findByGardenIdAndUser_UserId(Integer gardenId, Integer userId) {
        return photoRepository.findByGardenIdAndUser_UserId(gardenId, userId);
    }

    public List<Garden> getGardensByUserId(Integer userId) {
        return gardenRepository.findByUser_UserId(userId);
    }

    //******  this for future if we decide to share all garden photos by users to all users

    public List<Photo> getAllGardenPhotos() {
        return photoRepository.findAll();
    }
}