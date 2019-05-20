<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;
use Auth;
use App\User;
use Log;

class AWS3 extends Controller
{
    public function index($key_or_token = null)
    {
        // \Log::alert('KEYY '. $key_or_token);
        \Log::alert('KEYY222 ');

        // if(!$key_or_token || empty($key_or_token) || is_null($key_or_token || $key_or_token == null || $key_or_token == '' || !isset($key_or_token))){
        if($key_or_token == null){
            \Log::alert('IS NULL ' .$key_or_token);
            return '';
        }

        if(is_numeric($key_or_token)){
            $key = $key_or_token;
        }
        else {
            \Log::alert('33 ');

            $user = User::where('token','=',$key_or_token)->first();
            $key = $user->id;
        }
        // else if(!empty($key_or_token) || !is_null($key_or_token) {
        //     $user = User::where('token','=',$key_or_token)->first()
        //     $key = $user->id;
        // }
        // else {
        //     return '';
        // }
        //         //Get an instance of S3 Client. This is one one to do it:
        $s3Client = new S3Client([
            'version'     => 'latest',
            'region'      => env('AWS_DEFAULT_REGION'), //Region of the bucket
            'credentials' => array(
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret'  => env('AWS_SECRET_ACCESS_KEY'),
            )
        ]);

        //Get a command to GetObject
        $cmd = $s3Client->getCommand('GetObject', [
            'Bucket' => env('AWS_BUCKET'),
            'Key'    => 'images/' . $key . '.jpg'
            // 'Key'    => 'images/1554336009test.jpg'
        ]);

        //The period of availability
        $request = $s3Client->createPresignedRequest($cmd, '+10 minutes');

        //Get the pre-signed URL
        $signedUrl = (string) $request->getUri();

        Log::alert($signedUrl);
        return $signedUrl;
        // Log::alert(Storage::url('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'));
        // Log::alert(Storage::disk('s3')->files('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'));
        // if(Storage::exists('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'))
        // {
        //     Log::alert('in GETT');
        //     return Storage::disk('s3')->get('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png');
        // }else
        // {
        //     return 'No Image';
        // }
//    public function index()
//    {
//        $url = 'https://s3.' . env('AWS_DEFAULT_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/images';
//        $headers = array(
//         'Content-Disposition' => 'inline',
//     );
//            $files = Storage::disk('s3')->files('images');
//            Log::alert(Storage::disk('s3')->url('images/1554336009test.jpg'));
// return $files;
    // return Storage::download($storage_path, $filename, $headers);
    //    $images = [];
    //    $files = Storage::disk('s3')->files('images');
    //    Log::alert('HEREE');
    //        foreach ($files as $file) {
    //            $images[] = [
    //                'name' => str_replace('images/', '', $file),
    //                'src' => $url . $file
    //            ];
    //        }
    //    return view('welcome', compact('images'));
   }
   public function store(Request $request, $token)
   {
       \Log::alert('HERE');
    //    $this->validate($request, [
    //        'image' => 'required|image|max:2048'
    //    ]);

       \Log::alert($token);
       \Log::alert($request);

       if ($request->hasFile('image')) {
           $file = $request->file('image');
           $user = User::where('token','=',$token)->first();
           $user_id = $user->id;
        //    $name = time() . $file->getClientOriginalName();
            $name = $user_id;
           $filePath = 'images/' . $name . '.jpg';
           Storage::disk('s3')->put($filePath, file_get_contents($file));
       }
       $user->avatar = $name;
       $user->update();
       return back()->withSuccess('Image uploaded successfully');
   }

   public function test (){
       Log::alert('heree');
   }
   public function destroy($image)
   {
       Storage::disk('s3')->delete('images/' . $image);
       return back()->withSuccess('Image was deleted successfully');
   }
}
