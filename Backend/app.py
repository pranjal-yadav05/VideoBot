from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
# Enable CORS for all routes to allow requests from our React frontend
CORS(app, resources={r"/*": {"origins": "*"}})

# Define the path where we'll store our sample video
# In a real application, you'd want to put this in a configuration file
STATIC_FOLDER = Path(__file__).parent / 'static'
SAMPLE_VIDEO_PATH = STATIC_FOLDER / 'sample.mp4'

# Create the static folder if it doesn't exist
STATIC_FOLDER.mkdir(exist_ok=True)

@app.route('/generate-video', methods=['POST'])
def generate_video():
    try:
        # Get the prompt from the request
        data = request.get_json()
        prompt = data.get('prompt')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400

        # Check if our sample video exists
        if not SAMPLE_VIDEO_PATH.exists():
            return jsonify({'error': 'Sample video not found'}), 404

        # Send the video file back to the client
        # send_file automatically handles setting the correct content type
        return send_file(
            SAMPLE_VIDEO_PATH,
            mimetype='video/mp4',
            as_attachment=True,
            download_name='generated-video.mp4'
        )

    except Exception as e:
        # Log the error in a production environment
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Make sure you have a sample video file in the static folder
    if not SAMPLE_VIDEO_PATH.exists():
        print(f"Warning: Please place a sample video file at {SAMPLE_VIDEO_PATH}")
        print("The application will still run, but video generation will fail")
    
    # Run the Flask application
    app.run(debug=True, host='0.0.0.0', port=5000)