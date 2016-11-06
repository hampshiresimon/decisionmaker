if not defined in_subprocess (cmd /k set in_subprocess=y ^& %0 %*) & exit )
d:
cd "D:\Simon\Projects\DecisionMakerReact\Client"
gulp dev
pause