<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Review;

class PrestataireController extends Controller
{
    public function top()
    {
        $prestataires=User::with(['category','events'])
            ->where('role','traiteur')
            ->get();

        $result=[];

        foreach($prestataires as $prestataire){

            $total=0;
            $nombreAvis=0;

            foreach($prestataire->events as $event){

                $reviews=Review::where('event_id',$event->id)->get();

                foreach($reviews as $review){
                    $total=$total+$review->rating;
                    $nombreAvis=$nombreAvis+1;
                }
            }

            if($nombreAvis>0){

                $rating=$total/$nombreAvis;

                $category='Prestataire';

                if($prestataire->category){
                    $category=$prestataire->category->name;
                }

                $image=null;
                $city=null;

                if(count($prestataire->events)>0){
                    $image=$prestataire->events[0]->image;
                    $city=$prestataire->events[0]->city;
                }

                $result[]=[
                    'id'=>$prestataire->id,
                    'name'=>$prestataire->name,
                    'category'=>$category,
                    'rating'=>round($rating,1),
                    'reviews_count'=>$nombreAvis,
                    'image'=>$image,
                    'city'=>$city
                ];
            }
        }

        usort($result,function($a,$b){
            return $b['rating']<=>$a['rating'];
        });

        return array_slice($result,0,3);
    }
}