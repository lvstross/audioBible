#!/bin/bash

# chapters start to end
for i in {11..27}
do
    # book
    python3 lsbible.py "leviticus+$i"
    wait
done