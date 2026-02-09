Demo
https://www.youtube.com/watch?v=CGnYCpzEKWo

Setup
https://www.youtube.com/watch?v=27-s6412mqE

Demo Transcript

0:01
[clears throat]
0:06
Uh hi. So I completed uh uh the P for uh
0:11
showing the S3 data into Salesforce. So
0:14
what I did was I took a small data set.
0:18
Um I mean this one you see if you see
0:20
here ID uh name account uh case external
0:24
ID. So these uh I mean I have four
0:27
records right now. So I uploaded these
0:30
four records into S3 uh here sample data
0:34
Salource test uh CSV and uh I can query
0:40
this uh data uh in here through Athena
0:43
and if you see here I mean the same
0:45
information you can see that uh this is
0:47
the external ID case 001 case 001 and
0:51
now if I go back to Salesforce and uh if
0:55
I simply run this u case when for this
0:59
case what I did the external ID is set
1:01
the same value case 001 and now if I go
1:04
to this tab here and um you will see
1:09
those uh records that have the case 001
1:12
so here case 00001 and uh so these
1:16
records also having the same records I
1:19
mean I have various uh uh patterns here
1:23
uh that I have done uh one is uh using
1:26
the objects in Salesforce and uh so this
1:31
is uh the bare minimum without any uh
1:34
coding or anything. So we can see the
1:36
data uh as soon as the connector uh is
1:41
configured properly in uh the SQL
1:44
connector with Salesforce. So this is u
1:48
the
1:50
way to do this one. So same same thing
1:53
uh but I mean internally it is still
1:56
using the directional data source and
1:58
I'm just querying through the LWC and uh
2:01
passing that uh for the LWC
2:04
uh while querying the data I'm just
2:06
passing this ID. So that's the second
2:08
pattern here.
2:11
The third one I mean without even using
2:13
any
2:15
uh external object so directly calling
2:19
Athena um through the API AEX call out.
2:23
So that's the third one. I mean if you
2:26
see uh the back end uh especially the
2:29
coding part and uh so this guy the first
2:33
uh LWC1
2:35
uh is this case external C1. So this one
2:38
is very straightforward one. So
2:40
basically we are calling this external
2:41
Salesforce case controller and uh this
2:45
guy uh all we are doing here uh making
2:48
that call to the external uh object. So
2:51
that's what we are doing here. I mean it
2:54
is still using that
2:56
external object and uh the final one um
3:00
is this guy. So basically it is using
3:03
that Athena service and uh this Athena
3:08
sales viewer. So basically here I'm
3:11
calling that same uh Athena service and
3:14
here uh I mean
3:17
what is happening uh sales Athena is
3:21
exposing an API and um so we are calling
3:24
the API directly. So I mean in this case
3:28
potentially we don't need to use any
3:32
uh data sources and all. So we should be
3:35
able to make the call out. Um
3:39
so that's that's this guy. So internally
3:42
so what is happening this start query
3:44
and um get query results I think. Uh so
3:48
there are two uh things that uh we need
3:51
to call from the API point of view. So
3:54
that will take care of it. So that's the
3:57
last part I think. uh the cost wise uh
4:02
most likely this one uh the uh AFX
4:05
callout one would be uh uh better one uh
4:09
because uh as long as uh the security
4:12
allows it. So because we anyway using uh
4:16
the Apex callouts and name credentials
4:18
and all we believe this should be fine
4:20
but whereas these two would cost more
4:23
money and uh so that's how it is. Thank
4:27
you.


Setup Transcript
0:04
So here is the setup that we need to do
0:07
for Salesforce to uh the um and I mean
0:12
the first and foremost thing. So we need
0:14
to create uh the bucket and the bucket
0:17
essentially wherever we want to place
0:19
the files we can place the files and
0:22
then uh we need uh this folder where we
0:26
want to capture the results now. So this
0:28
is for Athena sake we need uh that
0:31
folder
0:32
uh I mean that's pretty much on the S3
0:34
side. So then on the uh connector side
0:38
uh the Athena side. So basically the
0:40
first thing uh we need to go to Athena
0:43
and then go to query editor and that
0:46
will bring us uh back here and uh here
0:49
we need to the first thing before we do
0:53
anything. So we have to come here and we
0:55
need to set this S3 bucket path and um
1:00
for so that we can execute it in uh here
1:04
and then there is another setting that
1:06
we need to do on the work group. So the
1:08
primary one we need to also say what is
1:12
the path uh here. So this this guy once
1:16
we go inside so the path basically
1:19
location of query result. So that's
1:20
that's the bare minimum setup and then
1:23
we need to create that uh um uh uh
1:28
database and that stuff. So that's we
1:30
need to run few queries specifically
1:32
that is creating the database and then
1:36
uh we need to um execute few queries
1:43
uh that will set up uh the entire thing.
1:45
So here if you see uh this is the uh
1:50
table creation here
1:54
the data. So here I made some changes to
1:58
the thing
2:00
and yeah this is uh kind of um we need
2:04
to create uh this uh table and that
2:08
basically gives us uh the access. Now if
2:12
we query any of this data let's say here
2:15
and it will give us the results. So now
2:18
I think
2:21
yeah so this is going to get all the
2:23
data
2:25
and so that's pretty much on the uh AWS
2:28
side. Now back in Salesforce if we want
2:31
to do it with external object um
2:35
we need to first go to external data
2:38
sources create the data source uh yeah
2:41
first before anything basically we need
2:43
to
2:45
uh do the name credential setup and
2:47
these are the uh credentials from AWS
2:51
again. So we need to create uh one name
2:54
credential and one external credential.
2:56
So this is the AWS Athena PS. So that is
2:59
uh the end point Athena whatever the
3:02
reason and uh then um pretty much that's
3:06
it on the name credential and uh the
3:08
authentication will come through the
3:10
external credential and so this is the
3:13
account ID
3:15
again region so what is the service and
3:17
the signature basically uh SIG V4 that's
3:21
the one we are going to use and uh
3:25
The main thing is on the uh principle.
3:28
So here when we see the principle so we
3:31
need to give that access token and
3:33
secret and I didn't have to use any
3:36
roles and obviously the credential uh
3:39
need to be added to the permission set
3:41
and permission set need to be added to
3:43
the user who is running this thing.
3:46
That's uh pretty much on the back end
3:49
setup. And uh now
3:52
if we go to external credentials uh
3:55
sorry um the data sources external data
3:58
sources
4:00
here
4:03
we will create um
4:07
uh yeah so we'll create a data source
4:10
and then uh this one by default it will
4:13
come the same thing from AWS data
4:16
catalog and uh Then once we I mean this
4:20
is where we need to give that name
4:22
credential whatever we just created I
4:25
mean we so this is the SL adapter and uh
4:29
here the provider is a Athena so that's
4:31
what we need to set and then when we say
4:34
okay validate and sync so that one
4:38
potentially will create um we should be
4:41
able to see the data this is the SF test
4:43
DP that we created uh here basically
4:47
that is test
4:51
and that that's now going back uh here
4:54
once we say okay what is the name field
4:57
and when we say sync basically that will
5:00
sync
5:02
uh the data and uh now all the data and
5:05
everything is available in Salesforce
5:08
uh so here we saw five credit cards now
5:12
if you go back to Salesforce also that
5:15
should be able to we should be able to
5:18
see the same uh data here. So we say
5:26
that one should be able to get us the
5:29
data and um
5:32
we can even
5:36
basically we can even filter the records
5:39
and all that stuff.
5:41
So now back uh again. So the few things
5:46
that we also need to do on the data
5:49
source
5:53
or external object.
6:00
So here for the search done those things
6:02
to work properly. So that's the object
6:05
that we object that was created and uh
6:09
manage
6:10
Basically, this is where we need to say
6:12
what are the feeds and the rest.
6:41
Yeah. So I mean I had to go change add
6:45
few records there. That's that's all I
6:47
had to do here.
6:58
logarically
7:03
this is where I have to add the case ID
7:06
and uh especially if you want to use
7:08
this guy um on the related object
7:12
related uh so this is the key basically
7:15
we need to say what is the external ID
7:18
on the um uh AWS side so this is the
7:22
case external ID so that's the one We
7:25
have to say okay this is how we want to
7:27
link case external ID and uh so we need
7:31
to create a field on the case object and
7:34
we link them
7:36
we go back to case object
7:57
So this is the external ID
8:01
and uh so
8:04
we create because of this guy. So I mean
8:07
we create this external ID and this to
8:10
be unique ID and um that's how
8:15
those relationships are established. So
8:18
back end external ID I mean this case
8:20
object field and uh this external ID
8:24
field. So this this is indirect lookup
8:27
to case for this field and this is the
8:30
external ID field on the AWS that's how
8:33
we are saying and because of that um and
8:37
when we create a related list here um
8:42
and especially whenever those uh record
8:44
details are matched mean the values are
8:47
matched and those one will show up here
8:49
and uh the setup for that one
8:53
is
8:57
when we go to this results. So here when
9:00
we pull up that single uh related list.
9:04
So this is the related list singing and
9:06
that is the sample sales one and uh we
9:10
have to say uh because of that
9:12
relationship was already established and
9:14
without any additional coding this one
9:16
will work seamlessly and this is uh LWC1
9:20
and it is basically using the same
9:23
queries and uh by taking that uh web
9:26
class so that's very simple one and
9:30
finally the last one is the AEX class
9:32
one um that uh is configured here. Um
9:38
the pure call outs basically. So this
9:41
last one is pure call out no external
9:44
thing and uh so that is because of this
9:48
service basically there are two things
9:50
that we need to be using.
9:53
Athena has it's good query and I mean we
9:59
need to set up the query and uh get the
10:02
results. This uh two things that uh we
10:05
will be doing uh for this one. Uh that's
10:10
pretty much about uh this guy.
10:14
So yeah
10:17
uh start query and uh get query results.
10:20
So two two calls we need to do and um we
10:25
will get the results and we will show it
10:27
to the user. That's pretty much about
10:30
this.