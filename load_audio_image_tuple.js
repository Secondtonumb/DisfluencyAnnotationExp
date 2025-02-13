/**
 * Loads audio–image tuples based on provided directories and file IDs.
 *
 * @param {string} audioDir - Directory for audio files (e.g., "wav/").
 * @param {string[]} imageDirs - Array of image directories (e.g., ["./fig/zs_hs_out/", "./fig/hs_out/"]).
 * @param {string|string[]} idSource - A string (with IDs separated by newlines or commas) or an array of file IDs.
 * @param {boolean} [shuffleResult=false] - If true, the returned array of tuples will be randomly shuffled.
 * @returns {Array} Array of tuple objects, each with an "audio" property and an "images" array.
 */
function loadTuples(audioDir, imageDirs, idSource, shuffleResult = false) {
    let ids = [];
  
    // Determine if idSource is a string or an array.
    if (typeof idSource === 'string') {
      // Split by newline or comma and remove any extra spaces.
      ids = idSource.split(/\r?\n|,/).map(id => id.trim()).filter(Boolean);
    } else if (Array.isArray(idSource)) {
      ids = idSource;
    } else {
      throw new Error('idSource must be either a string or an array of IDs.');
    }
  
    // Build tuples: each tuple is an object with:
    //   - audio: audioDir + id + '.wav'
    //   - images: an array of objects, one per image directory,
    //             each built as { image: imageDir + id + '.png' }
    let tuples = ids.map(id => ({
      audio: `${audioDir}${id}.wav`,
      images: imageDirs.map(dir => ({ image: `${dir}${id}.png` }))
    }));
  
    // Optionally shuffle the tuples using Fisher–Yates.
    if (shuffleResult) {
      for (let i = tuples.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tuples[i], tuples[j]] = [tuples[j], tuples[i]];
      }
    }
  
    return tuples;
  }
  

  
  /*
    The resulting tuples array will look like:
    [
      {
        audio: "wav/another.wav",
        images: [
          { image: "./fig/zs_hs_out/another.png" },
          { image: "./fig/hs_out/another.png" }
        ]
      },
      {
        audio: "wav/0668-0007.wav",
        images: [
          { image: "./fig/zs_hs_out/0668-0007.png" },
          { image: "./fig/hs_out/0668-0007.png" }
        ]
      },
      ... etc.
    ]
  */