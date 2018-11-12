from os import chdir, listdir, getcwd

chdir('resources/scene1')

def master():
    list_dir = listdir(getcwd())
    for thing in list_dir:
        try:
            chdir(thing)
            print(thing)
            master()
            chdir('..')
        except:
            pass
    with open('master.txt', 'w+') as f:
        f.write('\n'.join(list_dir))

master()
