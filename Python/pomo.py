# python pomodoro
import time 

POMO_TIME_CONST = {
    'working' : 15000,
    'breaking' : 300,
    'current' : 0
}

POMO_STATES = {
    'ticking' : False,
    'running': True
    'mode' : None,
    'timer_state' : None
}

POMO_COMMANDS = {
    'p' : 
}

def main():
    # Running loop
    while(POMO_STATES['running']):
        listenForUserOption()
        while(POMO_STATES['ticking']):
            time.sleep(1) # Sleep to emulate real time
            tick()

def tick():
    if 
    POMO_TIME_CONST['current'] = POMO_TIME_CONST['current'] + 1
    print (POMO_TIME_CONST['current'])

def listenForUserOption():
    print ('PomoTimer 0.1 ')
    print ('Select an option ... ')
    print ('1 :: Working')
    print ('2 :: Breaking')

def switchState(state):
    POMO_STATES['mode'] = state

def pause_timer():
    pass
def resume_timer():
    pass
def start_timer():
    pass

main()