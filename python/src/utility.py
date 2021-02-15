# sorting the files in the directory based on creation time

import glob
import os

def mostrecentfile():

    #specify the directory for searching
    search_dir = "../../uploads/"

    #sorting the file according to modified time
    files = glob.glob(search_dir+"*")
    files.sort(key=os.path.getmtime)

    return files[-1]


if __name__ == '__main__':
    mostrecentfile()
