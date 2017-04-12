# python 2.79
# angualr-set-debug-mode.py
import shutil
import Enum
# Init field variables

# Constant File locations
PROJ_DIR = '/sbx-webclient-php'
STORE_DIR = '../test/files'
ANGULAR_MIN_LOC = PROJ_DIR + 'js/angular.min.js'

# Enumeration for mode
class Mode(Enum):
    DEBUG = 0
    PROD = 1

'''Function that moves files'''
def move_file(src, loc):
    try:
        shutil.move(src, loc)
        return true
    except File_Error as e:
        print ('Some file thing died :: ' + e)
    return false

'''Function that edits the master file'''
def master_dependency_edit(master_file_loc, mode):
    try:
        if master_file_loc:
            with(master_file_loc) as file_to_edit:
                for line in file_to_edit:
                    # look for line of text
                    # when found remove comments
                    # replace file at location
            return true
        else:
            return false
    except File_Error as e:
        print ('''Some edit of the dependency file 
            thing died :: ''' + e)
    return false

def user_input_handler():
    print ('''Please select which mode you wish your 
            angluar application to run in...''')
    print (''' 
        0 : Debug
        1 : Prod
        ''')
    pass
    
def main():
    try:
        # Set mode according to users input 
        mode = user_input_handler()
        # move files
        if move_file(PROJ_DIR, ANGULAR_MIN_DIR_LOC) != true:
            return false
        # Parse in and edit master file
        if master_dependency_edit(master_file) != true:
            return false
    # Catch here
    except Error as e:
        print ('something died :: ' + e)
        return false

# Run script
main()