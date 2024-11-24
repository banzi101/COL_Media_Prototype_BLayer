const Media = require('../modules/mediaModule');
const logger = require('../loggerService');


exports.getAllMedia = async (request, response) => {
    try {
    const mediaList = await Media.find();
    response.status(200).json(mediaList);
    logger.info('got all media');
    } catch (error) {
      response.status(500).json({ message: error.message });
      logger.error('error getting all media:', error);
}
};


function validateMediaName(mediaName){

    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    if (regex.test(mediaName)){
        console.log('name validation failed');
        return false;
    }
    return true;

}

async function checkDuplicateMediaName(mediaName){
    try {
        const media = await Media.findOne({ mediaName: mediaName });
        if (media) {
            console.log('name already there');
            return false;
        } else {
            console.log('name is not there');
            return true;
        }
    } catch (error) {
            logger.error('error checking duplicate media name:', error);
            return false;
    }


}


exports.getByMediaName = async (request, response) => {
    const mediaName = request.params.mediaName;
    
    if(!validateMediaName(mediaName)){
        response.status(500).json({ message: "Invalid Media name" });
    }

    try {
    const media = await Media.findOne({ mediaName: mediaName });
    if (!media) {
        return response.status(404).json({ message: "Media not found" });
    }
    response.status(200).json(media);
    } catch (error) {
        response.status(500).json({ message: error.message });
        logger.error('error finding media by name:', error);

    }
};

exports.getMediaById = async (request, response) => {
    const mediaId = request.params.id;
    try {
    const media = await Media.findOne({ _id: mediaId });
    if (!media) {
        return response.status(404).json({ message: "Media not found" });
    }
    response.status(200).json(media);
    } catch (error) {
      response.status(500).json({ message: error.message });
      logger.error('error finding media by id:', error);
    }
};

exports.createMedia = async (request, response) => {
    console.log(request.body)
    const { fileName, mediaName, path } = request.body;
    
    if(!validateMediaName(mediaName)){
        response.status(500).json({ message: "Invalid Media name" });
    }

    if(!await checkDuplicateMediaName(mediaName)){
        response.status(500).json({ message: "Media name exists" });   
    }

    try {
        // Create Media in the database
        const media = await Media.create({ fileName, mediaName, path });
    
        // Respond with success message and created Media's ID
        response.status(201).json({ message: "Media created successfully", id: media._id });
    } catch (error) {
        // If an error occurs, respond with an error message
        response.status(500).json({ message: error.message });
        logger.error('error creating media record:', error);
    }   


    
};  


exports.updateMedia = async (request, response) => {
    console.log(request.body);
    const mediaId = request.params.id;
    const { fileName, mediaName, path } = request.body;
  
    try {
        // Update Media in the database
        const result = await Media.updateOne(
            { mediaId }, 
            { $set: { fileName: fileName, mediaName: mediaName, path: path } }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({ message: "Media not found" });
        }

        // Respond with success message
        response.status(200).json({ message: "Media updated successfully" });
    } catch (error) {
        // If an error occurs, respond with an error message
        response.status(500).json({ message: error.message });
        logger.error('error updating media record:', error);
    }   
};


exports.deleteMedia = async (request, response) => {
    console.log(request.body);
    const mediaId = request.params.id;
  
    try {
        // Delete Media from the database
        const result = await Media.deleteOne({ mediaId });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "Media not found" });
        }
  
        // Respond with success message
        response.status(200).json({ message: "Media deleted successfully" });
    } catch (error) {
        // If an error occurs, respond with an error message
        response.status(500).json({ message: error.message });
        logger.error('error deleting media record:', error);
    }   
};
 