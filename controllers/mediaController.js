const Media = require("../modules/mediaModule");
// const { logger } = require('../loggerService');


exports.getAllMedia = async (request, response) => {
    try {
    const mediaList = await Media.find();
    // logger({
    //     messageString: 'This is a log message',
    //     additionalInfo: {
    //       error: null,
    //       request: additionalInfo?.request 
    //       ? {
    //         user: additionalInfo?.request?.user,
    //         rawHeaders: additionalInfo?.request?.rawHeaders,
    //         reqheader: additionalInfo?.request?.headers,
    //         reqBody: additionalInfo?.request?.body,
    //         reqParam: additionalInfo?.request?.params,
    //         reqQuery: additionalInfo?.request?.query,
    //       },
    //     },
    // })
    response.status(200).json(mediaList);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
};


function validateMediaName(mediaName){

    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    if (regex.test(mediaName)){
        console.log("name validation failed");
        return false;
    }
    return true;

}

async function checkDuplicateMediaName(mediaName){
    try {
        const media = await Media.findOne({ mediaName: mediaName });
        if (media) {
            console.log("name already there");
            return false;
        } else {
            console.log("name is not there");
            return true;
        }
    } catch (error) {
            console.log(error);
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
    }
};
 